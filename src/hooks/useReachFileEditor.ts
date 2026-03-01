import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

/**
 * Manages code files stored in reach_files table.
 * Each file stores its text content inline in the `content` column.
 * This is the primary storage for the IDE when no GitHub workspace is connected.
 */

export interface CodeFile {
  id: string;
  workspace_id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  folder: boolean;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

function detectLanguage(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase() || "";
  const map: Record<string, string> = {
    ts: "typescript", tsx: "typescript", js: "javascript", jsx: "javascript",
    go: "go", rs: "rust", py: "python", md: "markdown", json: "json",
    yaml: "yaml", yml: "yaml", toml: "ini", css: "css", scss: "scss",
    html: "html", sql: "sql", sh: "shell", bash: "shell",
    dockerfile: "dockerfile", makefile: "makefile", mod: "go",
    txt: "plaintext", xml: "xml", env: "plaintext",
  };
  return map[ext] || "plaintext";
}

export function useReachFileEditor(workspaceId: string | null) {
  const { user } = useAuth();
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!workspaceId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("reach_files")
        .select("id, workspace_id, name, path, content, language, folder, parent_id, created_at, updated_at")
        .eq("workspace_id", workspaceId)
        .order("folder", { ascending: false })
        .order("path", { ascending: true });
      if (error) throw error;
      setFiles((data || []).map((d: any) => ({
        ...d,
        content: d.content || "",
        language: d.language || detectLanguage(d.path || d.name),
      })));
    } catch (err) {
      console.error("[useReachFileEditor] Load failed:", err);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  const createFile = useCallback(async (path: string, content = ""): Promise<CodeFile | null> => {
    if (!workspaceId || !user) return null;
    const name = path.split("/").pop() || path;
    const language = detectLanguage(path);
    const { data, error } = await supabase
      .from("reach_files")
      .insert({
        workspace_id: workspaceId,
        name,
        path,
        content,
        language,
        folder: false,
        uploaded_by: user.id,
      } as any)
      .select()
      .single();
    if (error) { console.error("[createFile]", error); return null; }
    const file: CodeFile = { ...(data as any), content: (data as any).content || "", language: (data as any).language || language };
    setFiles(prev => [...prev, file]);
    return file;
  }, [workspaceId, user]);

  const createFolder = useCallback(async (path: string): Promise<CodeFile | null> => {
    if (!workspaceId || !user) return null;
    const name = path.split("/").pop() || path;
    const { data, error } = await supabase
      .from("reach_files")
      .insert({
        workspace_id: workspaceId,
        name,
        path,
        folder: true,
        uploaded_by: user.id,
      } as any)
      .select()
      .single();
    if (error) { console.error("[createFolder]", error); return null; }
    const folder: CodeFile = { ...(data as any), content: "", language: "plaintext" };
    setFiles(prev => [...prev, folder]);
    return folder;
  }, [workspaceId, user]);

  const saveFile = useCallback(async (fileId: string, content: string) => {
    const { error } = await supabase
      .from("reach_files")
      .update({ content } as any)
      .eq("id", fileId);
    if (error) { console.error("[saveFile]", error); return false; }
    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, content } : f));
    return true;
  }, []);

  const deleteFile = useCallback(async (fileId: string) => {
    const { error } = await supabase
      .from("reach_files")
      .delete()
      .eq("id", fileId);
    if (error) { console.error("[deleteFile]", error); return false; }
    setFiles(prev => prev.filter(f => f.id !== fileId));
    return true;
  }, []);

  const renameFile = useCallback(async (fileId: string, newPath: string) => {
    const newName = newPath.split("/").pop() || newPath;
    const newLang = detectLanguage(newPath);
    const { error } = await supabase
      .from("reach_files")
      .update({ path: newPath, name: newName, language: newLang } as any)
      .eq("id", fileId);
    if (error) { console.error("[renameFile]", error); return false; }
    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, path: newPath, name: newName, language: newLang } : f));
    return true;
  }, []);

  const getFileByPath = useCallback((path: string) => {
    return files.find(f => f.path === path) || null;
  }, [files]);

  return { files, loading, load, createFile, createFolder, saveFile, deleteFile, renameFile, getFileByPath };
}
