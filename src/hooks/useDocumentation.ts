import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface DocPage {
  id: string;
  notion_id: string;
  parent_id: string | null;
  title: string;
  path: string;
  content: string | null;
  icon: string | null;
  module_code: string | null;
  page_type: string;
  order_index: number;
}

export interface DocModule {
  module_code: string;
  module_name: string;
  display_name: string;
  page_count: number;
}

export function useModules() {
  const [modules, setModules] = useState<DocModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    async function load() {
      const { data } = await supabase!
        .from('v_module_stats')
        .select('*')
        .order('order_index');
      setModules(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return { modules, loading };
}

export function useAllPages() {
  const [pages, setPages] = useState<DocPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setError('VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are not set. Add them in Project Settings → Environment Variables.');
      setLoading(false);
      return;
    }
    async function load() {
      const { data, error: err } = await supabase!
        .from('pages')
        .select('*')
        .eq('is_deleted', false)
        .order('order_index');

      if (err) {
        setError(err.message);
      } else {
        setPages(data || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  return { pages, loading, error };
}

export function usePageContent(pageId: string) {
  const [page, setPage] = useState<DocPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pageId || !supabase) {
      setLoading(false);
      return;
    }
    async function load() {
      setLoading(true);
      const { data } = await supabase!
        .from('pages')
        .select('*')
        .eq('id', pageId)
        .single();
      setPage(data);
      setLoading(false);
    }
    load();
  }, [pageId]);

  return { page, loading };
}

export function useSearch(query: string) {
  const [results, setResults] = useState<DocPage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2 || !supabase) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => search(), 300);
    return () => clearTimeout(timer);
  }, [query]);

  async function search() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from('pages')
      .select('id, title, path, icon, notion_id, parent_id, content, module_code, page_type, order_index')
      .textSearch('search_vector', query, { type: 'websearch', config: 'english' })
      .limit(20);
    setResults(data || []);
    setLoading(false);
  }

  return { results, loading };
}

export function useChildren(parentId: string) {
  const [children, setChildren] = useState<DocPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    async function load() {
      const { data } = await supabase!
        .from('pages')
        .select('*')
        .eq('parent_id', parentId)
        .order('order_index');
      setChildren(data || []);
      setLoading(false);
    }
    load();
  }, [parentId]);

  return { children, loading };
}
