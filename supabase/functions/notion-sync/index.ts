import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const NOTION_TOKEN = Deno.env.get('NOTION_TOKEN')!;
const NOTION_ROOT_PAGE_ID = Deno.env.get('NOTION_ROOT_PAGE_ID')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const NOTION_HEADERS = {
  'Authorization': `Bearer ${NOTION_TOKEN}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
};

let pagesSynced = 0;
let pagesCreated = 0;
let pagesUpdated = 0;

function extractTitle(page: any): string {
  const titleProp = page.properties?.title || page.properties?.Title;
  if (!titleProp?.title?.length) return 'Untitled';
  return titleProp.title.map((t: any) => t.plain_text).join('');
}

function extractIcon(page: any): string | null {
  if (page.icon?.type === 'emoji') return page.icon.emoji;
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
  if (depth === 0) return 'root';
  if (depth === 1) return 'module';
  if (title.includes('Group Page:') || title.includes('Module Page:')) return 'group';
  if (title.includes('Subgroup Page:')) return 'subgroup';
  return 'leaf';
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
    url.searchParams.set('page_size', '100');
    if (cursor) url.searchParams.set('start_cursor', cursor);

    const res = await fetch(url.toString(), { headers: NOTION_HEADERS });
    if (!res.ok) throw new Error(`Notion blocks API error ${res.status}: ${await res.text()}`);
    const data = await res.json();
    allResults.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return allResults;
}

async function blocksToMarkdown(blocks: any[]): Promise<string> {
  let md = '';

  for (const block of blocks) {
    const t = block.type;

    const richText = (arr: any[]) => arr?.map((r: any) => r.plain_text).join('') || '';

    if (t === 'paragraph') {
      const text = richText(block.paragraph?.rich_text);
      if (text) md += text + '\n\n';
    } else if (t === 'heading_1') {
      md += `# ${richText(block.heading_1?.rich_text)}\n\n`;
    } else if (t === 'heading_2') {
      md += `## ${richText(block.heading_2?.rich_text)}\n\n`;
    } else if (t === 'heading_3') {
      md += `### ${richText(block.heading_3?.rich_text)}\n\n`;
    } else if (t === 'bulleted_list_item') {
      md += `- ${richText(block.bulleted_list_item?.rich_text)}\n`;
    } else if (t === 'numbered_list_item') {
      md += `1. ${richText(block.numbered_list_item?.rich_text)}\n`;
    } else if (t === 'code') {
      const lang = block.code?.language || '';
      md += `\`\`\`${lang}\n${richText(block.code?.rich_text)}\n\`\`\`\n\n`;
    } else if (t === 'quote') {
      md += `> ${richText(block.quote?.rich_text)}\n\n`;
    } else if (t === 'callout') {
      const emoji = block.callout?.icon?.emoji || '';
      md += `> ${emoji} ${richText(block.callout?.rich_text)}\n\n`;
    } else if (t === 'divider') {
      md += `---\n\n`;
    } else if (t === 'table_of_contents') {
      // skip
    }
  }

  return md.trim();
}

async function upsertPage(data: any): Promise<string> {
  const { data: existing } = await supabase
    .from('pages')
    .select('id')
    .eq('notion_id', data.notion_id)
    .maybeSingle();

  const { data: saved, error } = await supabase
    .from('pages')
    .upsert(data, { onConflict: 'notion_id' })
    .select('id')
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
  depth: number = 0,
  parentPath: string = '',
  orderIndex: number = 0
): Promise<void> {
  const indent = '  '.repeat(depth);
  console.log(`${indent}[depth=${depth}] Syncing page: ${pageId}`);

  const notionPage = await fetchNotionPage(pageId);
  const title = extractTitle(notionPage);
  const icon = extractIcon(notionPage);
  const moduleCode = depth === 1 ? extractModuleCode(title) : null;
  const pageType = determinePageType(depth, title);
  const currentPath = parentPath ? `${parentPath} / ${title}` : title;

  // Fetch and convert content
  const blocks = await fetchNotionBlocks(pageId);
  const content = await blocksToMarkdown(blocks.filter((b: any) => b.type !== 'child_page'));

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

  // Recurse into child pages
  const childPages = blocks.filter((b: any) => b.type === 'child_page');
  console.log(`${indent}  → Found ${childPages.length} child pages`);

  for (let i = 0; i < childPages.length; i++) {
    await syncPageRecursive(childPages[i].id, dbId, depth + 1, currentPath, i);
    // Rate limit: ~3 req/sec
    await new Promise(resolve => setTimeout(resolve, 350));
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log('🔄 Starting Notion sync...');
  console.log(`Root page: ${NOTION_ROOT_PAGE_ID}`);

  // Reset counters
  pagesSynced = 0;
  pagesCreated = 0;
  pagesUpdated = 0;

  const { data: syncRun, error: syncError } = await supabase
    .from('sync_runs')
    .insert({ status: 'running' })
    .select()
    .single();

  if (syncError) {
    console.error('Failed to create sync run:', syncError);
    return new Response(
      JSON.stringify({ success: false, error: syncError.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const startTime = Date.now();

  try {
    await syncPageRecursive(NOTION_ROOT_PAGE_ID);

    const duration = Date.now() - startTime;

    await supabase
      .from('sync_runs')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        duration_ms: duration,
        pages_synced: pagesSynced,
        pages_created: pagesCreated,
        pages_updated: pagesUpdated,
      })
      .eq('id', syncRun.id);

    console.log(`✅ Sync complete in ${duration}ms — ${pagesSynced} pages (${pagesCreated} new, ${pagesUpdated} updated)`);

    return new Response(
      JSON.stringify({
        success: true,
        duration_ms: duration,
        pages_synced: pagesSynced,
        pages_created: pagesCreated,
        pages_updated: pagesUpdated,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('❌ Sync failed:', error.message);

    await supabase
      .from('sync_runs')
      .update({
        status: 'failed',
        error_message: error.message,
        completed_at: new Date().toISOString(),
        duration_ms: duration,
        pages_synced: pagesSynced,
      })
      .eq('id', syncRun.id);

    return new Response(
      JSON.stringify({ success: false, error: error.message, pages_synced: pagesSynced }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
