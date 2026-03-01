import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ReachFile {
  id: string;
  workspace_id: string;
  name: string;
  path: string;
  mime_type: string | null;
  size_bytes: number | null;
  storage_path: string | null;
  uploaded_by: string;
  folder: boolean;
  parent_id: string | null;
  content: string | null;
  language: string | null;
  created_at: string;
  updated_at: string;
}

export function useReachFiles(workspaceId: string | null) {
  const { user } = useAuth();
  const [files, setFiles] = useState<ReachFile[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!workspaceId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("reach_files")
        .select("*")
        .eq("workspace_id", workspaceId)
        .order("folder", { ascending: false })
        .order("name", { ascending: true });
      if (error) throw error;
      setFiles((data || []) as unknown as ReachFile[]);
    } catch (err) {
      console.error("[useReachFiles] Load failed:", err);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  const createFolder = useCallback(async (name: string, parentId?: string) => {
    if (!workspaceId || !user) throw new Error("No workspace or user");
    const parentPath = parentId ? files.find(f => f.id === parentId)?.path : "";
    const path = parentPath ? `${parentPath}/${name}` : name;
    const { data, error } = await supabase
      .from("reach_files")
      .insert({
        workspace_id: workspaceId,
        name,
        path,
        folder: true,
        uploaded_by: user.id,
        parent_id: parentId || null,
      })
      .select()
      .single();
    if (error) throw error;
    const folder = data as unknown as ReachFile;
    setFiles(prev => [...prev, folder]);
    return folder;
  }, [workspaceId, user, files]);

  const uploadFile = useCallback(async (file: File, parentId?: string) => {
    if (!workspaceId || !user) throw new Error("No workspace or user");
    const parentPath = parentId ? files.find(f => f.id === parentId)?.path : "";
    const filePath = parentPath ? `${parentPath}/${file.name}` : file.name;
    const storagePath = `${workspaceId}/${filePath}`;

    // Upload to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from("reach-files")
      .upload(storagePath, file, { upsert: true });
    if (uploadError) throw uploadError;

    // Create metadata record
    const { data, error } = await supabase
      .from("reach_files")
      .insert({
        workspace_id: workspaceId,
        name: file.name,
        path: filePath,
        mime_type: file.type,
        size_bytes: file.size,
        storage_path: storagePath,
        uploaded_by: user.id,
        parent_id: parentId || null,
      })
      .select()
      .single();
    if (error) throw error;
    const record = data as unknown as ReachFile;
    setFiles(prev => [...prev, record]);
    return record;
  }, [workspaceId, user, files]);

  const deleteFile = useCallback(async (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    // Delete from storage if it has a storage path
    if (file.storage_path) {
      await supabase.storage.from("reach-files").remove([file.storage_path]);
    }

    const { error } = await supabase.from("reach_files").delete().eq("id", fileId);
    if (error) throw error;
    setFiles(prev => prev.filter(f => f.id !== fileId));
  }, [files]);

  const getDownloadUrl = useCallback(async (storagePath: string) => {
    const { data } = await supabase.storage.from("reach-files").createSignedUrl(storagePath, 3600);
    return data?.signedUrl || null;
  }, []);

  return { files, loading, load, createFolder, uploadFile, deleteFile, getDownloadUrl };
}
