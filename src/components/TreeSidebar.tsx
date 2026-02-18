import { useState } from 'react';
import { ChevronRight, ChevronDown, FileText, FolderOpen, Folder } from 'lucide-react';
import { DocPage } from '@/hooks/useDocumentation';

const ORANGE = 'hsl(24 95% 53%)';

interface TreeNodeProps {
  page: DocPage;
  children: DocPage[];
  level: number;
  onPageSelect: (pageId: string) => void;
  selectedPageId: string | null;
  childrenMap: Map<string, DocPage[]>;
}

function TreeNode({ page, children, level, onPageSelect, selectedPageId, childrenMap }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasChildren = children.length > 0;
  const isSelected = selectedPageId === page.id;

  return (
    <div>
      <button
        onClick={() => {
          if (hasChildren) setIsExpanded(!isExpanded);
          onPageSelect(page.id);
        }}
        className="w-full flex items-center gap-2 py-1.5 px-2 rounded text-left transition-colors"
        style={{
          paddingLeft: `${level * 12 + 8}px`,
          background: isSelected ? 'rgba(59,130,246,0.18)' : 'transparent',
          color: isSelected ? '#93c5fd' : level === 0 ? '#e2e8f0' : level === 1 ? '#cbd5e1' : '#94a3b8',
        }}
      >
        {hasChildren ? (
          isExpanded
            ? <ChevronDown size={11} style={{ flexShrink: 0, color: '#64748b' }} />
            : <ChevronRight size={11} style={{ flexShrink: 0, color: '#64748b' }} />
        ) : (
          <span style={{ width: 11, flexShrink: 0 }} />
        )}

        {page.icon ? (
          <span style={{ fontSize: '0.85rem', flexShrink: 0 }}>{page.icon}</span>
        ) : hasChildren ? (
          isExpanded
            ? <FolderOpen size={13} style={{ color: ORANGE, flexShrink: 0 }} />
            : <Folder size={13} style={{ color: '#64748b', flexShrink: 0 }} />
        ) : (
          <FileText size={12} style={{ color: '#475569', flexShrink: 0 }} />
        )}

        <span
          className="truncate flex-1"
          style={{
            fontSize: level === 0 ? '0.72rem' : level === 1 ? '0.8rem' : '0.75rem',
            fontWeight: level === 0 ? 600 : level === 1 ? 500 : 400,
            letterSpacing: level === 0 ? '0.07em' : undefined,
            color: level === 0 ? ORANGE : undefined,
          }}
        >
          {page.title}
        </span>

        {hasChildren && (
          <span
            style={{
              fontSize: '0.65rem',
              color: '#475569',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 4,
              padding: '1px 5px',
              flexShrink: 0,
            }}
          >
            {children.length}
          </span>
        )}
      </button>

      {isExpanded && hasChildren && (
        <div>
          {children.map((child) => (
            <TreeNode
              key={child.id}
              page={child}
              children={childrenMap.get(child.id) || []}
              level={level + 1}
              onPageSelect={onPageSelect}
              selectedPageId={selectedPageId}
              childrenMap={childrenMap}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface TreeSidebarProps {
  allPages: DocPage[];
  loading: boolean;
  error: string | null;
  onPageSelect: (pageId: string) => void;
  selectedPageId: string | null;
  searchQuery: string;
}

export function TreeSidebar({
  allPages,
  loading,
  error,
  onPageSelect,
  selectedPageId,
  searchQuery,
}: TreeSidebarProps) {
  // Build parent-child map
  const childrenMap = new Map<string, DocPage[]>();
  const rootPages: DocPage[] = [];

  const filtered = searchQuery.length > 1
    ? allPages.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : allPages;

  // When searching, show flat results
  if (searchQuery.length > 1) {
    return (
      <div className="space-y-0.5">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-slate-600" style={{ fontSize: '0.78rem' }}>No results</div>
        ) : filtered.slice(0, 50).map(page => (
          <button
            key={page.id}
            onClick={() => onPageSelect(page.id)}
            className="w-full flex items-center gap-2 py-1.5 px-3 rounded text-left transition-colors"
            style={{
              background: selectedPageId === page.id ? 'rgba(59,130,246,0.18)' : 'transparent',
              color: selectedPageId === page.id ? '#93c5fd' : '#94a3b8',
            }}
          >
            <FileText size={12} style={{ flexShrink: 0, color: '#475569' }} />
            <span className="truncate" style={{ fontSize: '0.78rem' }}>{page.title}</span>
          </button>
        ))}
      </div>
    );
  }

  allPages.forEach((page) => {
    if (!page.parent_id) {
      rootPages.push(page);
    } else {
      const siblings = childrenMap.get(page.parent_id) || [];
      siblings.push(page);
      childrenMap.set(page.parent_id, siblings);
    }
  });

  childrenMap.forEach((children) => {
    children.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
  });
  rootPages.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

  if (loading) {
    return (
      <div className="flex flex-col gap-2 px-3 py-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-5 rounded bg-white/5 animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-3 py-6 text-center">
        <p className="text-red-400 text-xs mb-2">Connection error</p>
        <p className="text-slate-600 text-xs">Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables</p>
      </div>
    );
  }

  if (rootPages.length === 0) {
    return (
      <div className="px-3 py-8 text-center">
        <FileText size={28} className="mx-auto mb-3 text-slate-700" />
        <p className="text-slate-500 text-xs mb-1">No pages synced yet</p>
        <p className="text-slate-700 text-xs">Run the Notion sync Edge Function first</p>
      </div>
    );
  }

  return (
    <div>
      <div className="px-3 py-2 mb-1" style={{ fontSize: '0.65rem', color: '#475569', letterSpacing: '0.08em' }}>
        {allPages.length} PAGES SYNCED
      </div>
      {rootPages.map((page) => (
        <TreeNode
          key={page.id}
          page={page}
          children={childrenMap.get(page.id) || []}
          level={0}
          onPageSelect={onPageSelect}
          selectedPageId={selectedPageId}
          childrenMap={childrenMap}
        />
      ))}
    </div>
  );
}
