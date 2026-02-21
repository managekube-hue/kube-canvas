import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const NOTION_TOKEN = Deno.env.get("NOTION_TOKEN")!;
const NOTION_ROOT_PAGE_ID = Deno.env.get("NOTION_ROOT_PAGE_ID")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const NOTION_HEADERS = {
  Authorization: `Bearer ${NOTION_TOKEN}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
};

let pagesSynced = 0;
let pagesCreated = 0;
let pagesUpdated = 0;

function extractTitle(page: any): string {
  const titleProp = page.properties?.title || page.properties?.Title;
  if (!titleProp?.title?.length) return "Untitled";
  return titleProp.title.map((t: any) => t.plain_text).join("");
}

function extractIcon(page: any): string | null {
  if (page.icon?.type === "emoji") return page.icon.emoji;
  return null;
}

function extractModuleCode(title: string): string | null {
  const patterns = [
    /^(K-VENDOR-\d{2})/,
    /^(\d{2}_[A-Z_]+)/,
    /^(K-MAP-\d{2})/,
    /^(K-DEPLOY-\d{2})/,
  ];
  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function determinePageType(depth: number, title: string): string {
  if (depth === 0) return "root";
  if (depth === 1) return "module";
  if (title.includes("Group Page:") || title.includes("Module Page:")) return "group";
  if (title.includes("Subgroup Page:")) return "subgroup";
  return "leaf";
}

async function fetchNotionPage(pageId: string): Promise<any> {
  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, { headers: NOTION_HEADERS });
  if (!res.ok) throw new Error(`Notion pages API error ${res.status}: ${await res.text()}`);
  return res.json();
}

async function fetchNotionBlocks(blockId: string): Promise<any[]> {
  const allResults: any[] = [];
  let cursor: string | undefined;

  do {
    const url = new URL(`https://api.notion.com/v1/blocks/${blockId}/children`);
    url.searchParams.set("page_size", "100");
    if (cursor) url.searchParams.set("start_cursor", cursor);

    const res = await fetch(url.toString(), { headers: NOTION_HEADERS });
    if (!res.ok) throw new Error(`Notion blocks API error ${res.status}: ${await res.text()}`);
    const data = await res.json();
    allResults.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return allResults;
}

async function blocksToMarkdown(blocks: any[]): Promise<string> {
  let md = "";

  const richText = (arr: any[]) =>
    arr?.map((r: any) => {
      let text = r.plain_text || "";
      if (r.href) text = `[${text}](${r.href})`;
      if (r.annotations?.bold) text = `**${text}**`;
      if (r.annotations?.italic) text = `*${text}*`;
      if (r.annotations?.code) text = `\`${text}\``;
      return text;
    }).join("") || "";

  for (const block of blocks) {
    const t = block.type;
    if (t === "paragraph") {
      const text = richText(block.paragraph?.rich_text);
      if (text) md += text + "\n\n";
    } else if (t === "heading_1") {
      md += `# ${richText(block.heading_1?.rich_text)}\n\n`;
    } else if (t === "heading_2") {
      md += `## ${richText(block.heading_2?.rich_text)}\n\n`;
    } else if (t === "heading_3") {
      md += `### ${richText(block.heading_3?.rich_text)}\n\n`;
    } else if (t === "bulleted_list_item") {
      md += `- ${richText(block.bulleted_list_item?.rich_text)}\n`;
    } else if (t === "numbered_list_item") {
      md += `1. ${richText(block.numbered_list_item?.rich_text)}\n`;
    } else if (t === "code") {
      const lang = block.code?.language || "";
      md += `\`\`\`${lang}\n${richText(block.code?.rich_text)}\n\`\`\`\n\n`;
    } else if (t === "quote") {
      md += `> ${richText(block.quote?.rich_text)}\n\n`;
    } else if (t === "callout") {
      const emoji = block.callout?.icon?.emoji || "💡";
      md += `> ${emoji} **${richText(block.callout?.rich_text)}**\n\n`;
    } else if (t === "toggle") {
      md += `**${richText(block.toggle?.rich_text)}**\n\n`;
    } else if (t === "divider") {
      md += `---\n\n`;
    } else if (t === "child_page") {
      md += `📄 **${block.child_page?.title || "Subpage"}**\n\n`;
    } else if (t === "child_database") {
      md += `🗄️ **${block.child_database?.title || "Database"}**\n\n`;
    } else if (t === "bookmark") {
      const url = block.bookmark?.url || "";
      const caption = richText(block.bookmark?.caption) || url;
      if (url) md += `[${caption}](${url})\n\n`;
    } else if (t === "link_preview") {
      const url = block.link_preview?.url || "";
      if (url) md += `[${url}](${url})\n\n`;
    } else if (t === "image") {
      const url = block.image?.file?.url || block.image?.external?.url || "";
      const caption = richText(block.image?.caption) || "Image";
      if (url) md += `![${caption}](${url})\n\n`;
    } else if (t === "video") {
      const url = block.video?.file?.url || block.video?.external?.url || "";
      const caption = richText(block.video?.caption) || "Video";
      if (url) md += `[▶ ${caption}](${url})\n\n`;
    } else if (t === "file") {
      const url = block.file?.file?.url || block.file?.external?.url || "";
      const name = richText(block.file?.caption) || block.file?.name || "File";
      if (url) md += `[📎 ${name}](${url})\n\n`;
    } else if (t === "pdf") {
      const url = block.pdf?.file?.url || block.pdf?.external?.url || "";
      if (url) md += `[📄 PDF Document](${url})\n\n`;
    }
  }

  return md.trim();
}

async function upsertPage(data: any): Promise<string> {
  const { data: existing } = await supabase
    .from("pages")
    .select("id")
    .eq("notion_id", data.notion_id)
    .maybeSingle();

  const { data: saved, error } = await supabase
    .from("pages")
    .upsert(data, { onConflict: "notion_id" })
    .select("id")
    .single();

  if (error) throw new Error(`DB upsert error: ${error.message}`);

  if (existing) pagesUpdated++;
  else pagesCreated++;
  pagesSynced++;

  return saved.id;
}

async function syncPageRecursive(
  pageId: string,
  parentDbId: string | null = null,
  depth = 0,
  parentPath = "",
  orderIndex = 0
): Promise<void> {
  const indent = "  ".repeat(depth);
  console.log(`${indent}[depth=${depth}] Syncing page: ${pageId}`);

  const notionPage = await fetchNotionPage(pageId);
  const title = extractTitle(notionPage);
  const icon = extractIcon(notionPage);
  const moduleCode = depth === 1 ? extractModuleCode(title) : null;
  const pageType = determinePageType(depth, title);
  const currentPath = parentPath ? `${parentPath} / ${title}` : title;

  const blocks = await fetchNotionBlocks(pageId);
  const content = await blocksToMarkdown(blocks.filter((b: any) => b.type !== "child_page"));

  const dbId = await upsertPage({
    notion_id: pageId,
    parent_id: parentDbId,
    title,
    icon,
    path: currentPath,
    content: content || null,
    page_type: pageType,
    module_code: moduleCode,
    order_index: orderIndex,
    notion_created_time: notionPage.created_time,
    notion_last_edited_time: notionPage.last_edited_time,
    last_synced_at: new Date().toISOString(),
    is_deleted: false,
  });

  const childPages = blocks.filter((b: any) => b.type === "child_page");
  console.log(`${indent}  → Found ${childPages.length} child pages`);

  for (let i = 0; i < childPages.length; i++) {
    await syncPageRecursive(childPages[i].id, dbId, depth + 1, currentPath, i);
    await new Promise((resolve) => setTimeout(resolve, 350));
  }
}

// ─── NOTION SEARCH: get ALL pages with edit times via paginated search ───────
// Returns a Map of notion_id (dashed) → last_edited_time for every page
// the integration can see. Uses pagination to get ALL results.
async function fetchAllNotionEditTimes(): Promise<Map<string, string>> {
  const editTimes = new Map<string, string>();
  let cursor: string | undefined;
  let pageNum = 0;

  do {
    pageNum++;
    const body: any = {
      filter: { property: "object", value: "page" },
      page_size: 100,
      sort: { direction: "descending", timestamp: "last_edited_time" },
    };
    if (cursor) body.start_cursor = cursor;

    const res = await fetch("https://api.notion.com/v1/search", {
      method: "POST",
      headers: NOTION_HEADERS,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`Notion search page ${pageNum} failed: ${res.status} ${errText}`);
      break;
    }

    const data = await res.json();
    for (const result of data.results || []) {
      if (result.object === "page") {
        editTimes.set(result.id, result.last_edited_time);
      }
    }

    console.log(`  📡 Search page ${pageNum}: got ${data.results?.length || 0} results (total: ${editTimes.size})`);
    cursor = data.has_more ? data.next_cursor : undefined;

    // Small delay between search pages
    await new Promise((resolve) => setTimeout(resolve, 150));
  } while (cursor);

  console.log(`📡 Notion search complete: ${editTimes.size} pages found`);
  return editTimes;
}

// ─── SYNC CHANGED CONTENT ───────────────────────────────────────────────────
// Strategy:
// 1. Use Notion Search API (paginated) to get ALL pages and their edit times
//    — This is ~5 API calls for 442 pages (100 per page), taking ~1-2 seconds
// 2. Load ALL DB pages
// 3. Compare timestamps: find pages where Notion edit time > stored edit time
// 4. Re-fetch content ONLY for changed pages + null-content pages
// No batch limits. No rotation. Every changed page gets synced every cycle.
async function syncChangedContent(): Promise<{ synced: number; checked: number; errors: number; notionTotal: number }> {
  const startTime = Date.now();
  const MAX_RUNTIME_MS = 50_000; // stay well under edge function timeout

  // STEP 1: Get ALL edit times from Notion in bulk (fast, paginated)
  const notionEditTimes = await fetchAllNotionEditTimes();

  if (notionEditTimes.size === 0) {
    console.log("⚠️ Notion search returned 0 pages — check integration token permissions");
    // Fallback: fetch ALL DB pages and check individually
    return await syncChangedContentFallback(MAX_RUNTIME_MS - (Date.now() - startTime));
  }

  // STEP 2: Get ALL DB pages
  const { data: allPages, error: dbErr } = await supabase
    .from("pages")
    .select("id, notion_id, title, content, notion_last_edited_time")
    .eq("is_deleted", false)
    .not("page_type", "eq", "root");

  if (dbErr) throw new Error(`DB query error: ${dbErr.message}`);
  if (!allPages || allPages.length === 0) {
    return { synced: 0, checked: 0, errors: 0, notionTotal: notionEditTimes.size };
  }

  // STEP 3: Find pages that need updating
  const needsSync: typeof allPages = [];

  for (const page of allPages) {
    const notionEditTime = notionEditTimes.get(page.notion_id);
    if (!notionEditTime) continue; // page not found in Notion search

    const notionEdited = new Date(notionEditTime);
    const storedEdited = page.notion_last_edited_time ? new Date(page.notion_last_edited_time) : null;

    // Sync if: never had a stored edit time, OR Notion edit is strictly newer
    if (!storedEdited || notionEdited.getTime() > storedEdited.getTime()) {
      needsSync.push(page);
    }
  }

  console.log(`📋 DB pages: ${allPages.length}, Notion pages: ${notionEditTimes.size}, Need sync: ${needsSync.length}`);

  if (needsSync.length === 0) {
    // Mark all pages as freshly checked
    const now = new Date().toISOString();
    await supabase
      .from("pages")
      .update({ last_synced_at: now })
      .eq("is_deleted", false)
      .not("page_type", "eq", "root");
    console.log("✅ All pages up to date");
    return { synced: 0, checked: allPages.length, errors: 0, notionTotal: notionEditTimes.size };
  }

  // STEP 4: Sync changed pages (fetch blocks + update content)
  let synced = 0;
  let errors = 0;

  for (const page of needsSync) {
    if (Date.now() - startTime > MAX_RUNTIME_MS) {
      console.log(`⏱ Runtime limit — synced ${synced}/${needsSync.length} changed pages`);
      break;
    }

    try {
      const notionEditTime = notionEditTimes.get(page.notion_id)!;
      console.log(`  🔄 ${page.title} (notion: ${notionEditTime} vs stored: ${page.notion_last_edited_time})`);

      const blocks = await fetchNotionBlocks(page.notion_id);
      const content = await blocksToMarkdown(blocks.filter((b: any) => b.type !== "child_page"));

      // Also fetch fresh page metadata for title/icon updates
      const notionPage = await fetchNotionPage(page.notion_id);
      const title = extractTitle(notionPage);
      const icon = extractIcon(notionPage);

      await supabase
        .from("pages")
        .update({
          content: content || "",
          title,
          icon,
          notion_last_edited_time: notionEditTime,
          last_synced_at: new Date().toISOString(),
        })
        .eq("id", page.id);

      synced++;
      console.log(`  ✅ ${page.title}`);
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (e: any) {
      errors++;
      console.error(`  ❌ ${page.title}: ${e.message}`);
    }
  }

  return { synced, checked: allPages.length, errors, notionTotal: notionEditTimes.size };
}

// Fallback if Notion Search API fails — check pages one by one
async function syncChangedContentFallback(remainingMs: number): Promise<{ synced: number; checked: number; errors: number; notionTotal: number }> {
  const startTime = Date.now();
  console.log("🔄 Fallback mode: checking pages individually");

  const { data: allPages } = await supabase
    .from("pages")
    .select("id, notion_id, title, content, notion_last_edited_time")
    .eq("is_deleted", false)
    .not("page_type", "eq", "root")
    .order("last_synced_at", { ascending: true, nullsFirst: true });

  if (!allPages || allPages.length === 0) {
    return { synced: 0, checked: 0, errors: 0, notionTotal: 0 };
  }

  let synced = 0;
  let checked = 0;
  let errors = 0;

  for (const page of allPages) {
    if (Date.now() - startTime > remainingMs) {
      console.log(`⏱ Fallback runtime limit after ${checked} pages`);
      break;
    }

    checked++;
    try {
      const notionPage = await fetchNotionPage(page.notion_id);
      const notionEditedTime = notionPage.last_edited_time;
      const storedEdited = page.notion_last_edited_time ? new Date(page.notion_last_edited_time) : null;
      const notionEdited = new Date(notionEditedTime);
      const needsUpdate = !storedEdited || notionEdited.getTime() > storedEdited.getTime();

      if (!needsUpdate) {
        await supabase.from("pages").update({ last_synced_at: new Date().toISOString() }).eq("id", page.id);
        await new Promise((resolve) => setTimeout(resolve, 80));
        continue;
      }

      const blocks = await fetchNotionBlocks(page.notion_id);
      const content = await blocksToMarkdown(blocks.filter((b: any) => b.type !== "child_page"));
      const title = extractTitle(notionPage);
      const icon = extractIcon(notionPage);

      await supabase.from("pages").update({
        content: content || "",
        title,
        icon,
        notion_last_edited_time: notionEditedTime,
        last_synced_at: new Date().toISOString(),
      }).eq("id", page.id);

      synced++;
      console.log(`  ✅ ${page.title}`);
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (e: any) {
      errors++;
      console.error(`  ❌ ${page.title}: ${e.message}`);
    }
  }

  return { synced, checked, errors, notionTotal: 0 };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  pagesSynced = 0;
  pagesCreated = 0;
  pagesUpdated = 0;

  let body: any = {};
  try {
    const text = await req.text();
    if (text) body = JSON.parse(text);
  } catch (_) {
    // no body
  }

  const startTime = Date.now();

  // MODE: sync_changed / fill_content — checks ALL pages for edits
  if (body.mode === "sync_changed" || body.mode === "fill_content") {
    console.log(`🔄 Sync-changed mode: checking ALL pages via Notion Search API`);

    // Create sync_run record
    const { data: syncRun } = await supabase
      .from("sync_runs")
      .insert({ status: "running", started_at: new Date().toISOString() })
      .select("id")
      .single();
    const runId = syncRun?.id;

    try {
      const result = await syncChangedContent();
      const duration = Date.now() - startTime;

      // Log completed run
      if (runId) {
        await supabase.from("sync_runs").update({
          status: result.errors > 0 ? "completed_with_errors" : "completed",
          completed_at: new Date().toISOString(),
          duration_ms: duration,
          pages_synced: result.synced,
          pages_updated: result.checked,
          error_message: result.errors > 0 ? `${result.errors} page(s) failed` : null,
        }).eq("id", runId);
      }

      return new Response(
        JSON.stringify({
          success: true,
          mode: "sync_changed",
          notion_pages_found: result.notionTotal,
          db_pages_checked: result.checked,
          pages_synced: result.synced,
          pages_errors: result.errors,
          duration_ms: duration,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (e: any) {
      const duration = Date.now() - startTime;
      // Log failed run
      if (runId) {
        await supabase.from("sync_runs").update({
          status: "failed",
          completed_at: new Date().toISOString(),
          duration_ms: duration,
          error_message: e.message,
        }).eq("id", runId);
      }

      return new Response(
        JSON.stringify({ success: false, error: e.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }

  // DEFAULT MODE: full structural sync (root listing or specific module)
  const startPageId: string = body.pageId || NOTION_ROOT_PAGE_ID;
  const parentDbId: string | null = body.parentDbId || null;
  const startDepth: number = body.depth ?? 0;
  const parentPath: string = body.parentPath || "";
  const orderIndex: number = body.orderIndex ?? 0;
  const isFull = !body.pageId;

  console.log(`🔄 Syncing page: ${startPageId} (depth=${startDepth}, full=${isFull})`);

  try {
    if (isFull) {
      const notionPage = await fetchNotionPage(startPageId);
      const title = extractTitle(notionPage);
      const icon = extractIcon(notionPage);
      const currentPath = title;

      const rootDbId = await upsertPage({
        notion_id: startPageId,
        parent_id: null,
        title,
        icon,
        path: currentPath,
        content: null,
        page_type: "root",
        module_code: null,
        order_index: 0,
        notion_created_time: notionPage.created_time,
        notion_last_edited_time: notionPage.last_edited_time,
        last_synced_at: new Date().toISOString(),
        is_deleted: false,
      });

      const blocks = await fetchNotionBlocks(startPageId);
      const moduleBlocks = blocks.filter((b: any) => b.type === "child_page");
      console.log(`Root has ${moduleBlocks.length} modules.`);

      const modules = moduleBlocks.map((b: any, i: number) => ({
        pageId: b.id,
        parentDbId: rootDbId,
        depth: 1,
        parentPath: currentPath,
        orderIndex: i,
      }));

      const duration = Date.now() - startTime;
      return new Response(
        JSON.stringify({
          success: true,
          mode: "root_only",
          root_synced: true,
          modules,
          module_count: modules.length,
          duration_ms: duration,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      await syncPageRecursive(startPageId, parentDbId, startDepth, parentPath, orderIndex);
      const duration = Date.now() - startTime;
      console.log(`✅ Module sync complete: ${pagesSynced} pages in ${duration}ms`);

      return new Response(
        JSON.stringify({
          success: true,
          mode: "module",
          pages_synced: pagesSynced,
          pages_created: pagesCreated,
          pages_updated: pagesUpdated,
          duration_ms: duration,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (e: any) {
    const duration = Date.now() - startTime;
    console.error("❌ Sync failed:", e.message);
    return new Response(
      JSON.stringify({ success: false, error: e.message, pages_synced: pagesSynced }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
