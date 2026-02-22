import ReactMarkdown from 'react-markdown';
import { usePageContent, useAllPages, DocPage } from '@/hooks/useDocumentation';
import { FileText, ChevronRight, FolderOpen, ArrowRight, RefreshCw, Code2, ExternalLink } from 'lucide-react';
import { useMemo } from 'react';

const ORANGE = 'hsl(24 95% 53%)';

interface PageViewerProps {
  pageId: string | null;
  onPageSelect?: (pageId: string) => void;
}

// Child page card component
function ChildPageCard({ page, onClick }: { page: DocPage; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-4 rounded-lg border text-left transition-all group"
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.03)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = ORANGE + '44';
        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
      }}
    >
      {page.icon ? (
        <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{page.icon}</span>
      ) : (
        <FileText size={16} style={{ color: '#475569', flexShrink: 0 }} />
      )}
      <div className="flex-1 min-w-0">
        <div className="font-mono text-sm font-medium truncate" style={{ color: '#e2e8f0' }}>
          {page.title}
        </div>
        {page.module_code && (
          <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{page.module_code}</div>
        )}
      </div>
      <ArrowRight size={14} style={{ color: '#475569', flexShrink: 0 }} className="group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
}

export function PageViewer({ pageId, onPageSelect }: PageViewerProps) {
  const { page, loading } = usePageContent(pageId || '');
  const { pages: allPages } = useAllPages();

  // Find direct children of this page
  const children = useMemo(() => {
    if (!pageId || !allPages.length) return [];
    return allPages
      .filter(p => p.parent_id === pageId)
      .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
  }, [pageId, allPages]);

  if (!pageId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-16 py-24">
        <FileText size={48} className="mb-8" style={{ color: ORANGE }} />
        <h1 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: 'monospace' }}>
          Kubric Technical Docs
        </h1>
        <p className="text-xl text-white/40 max-w-2xl mb-10 leading-relaxed">
          Select a page from the sidebar to view its content. The tree is synced live from Notion.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-12 space-y-4">
        <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
        <div className="h-12 w-2/3 bg-white/5 rounded animate-pulse" />
        <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
        <div className="h-4 w-4/6 bg-white/5 rounded animate-pulse" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-16 py-24">
        <p className="text-slate-500">Page not found</p>
      </div>
    );
  }

  // Build breadcrumb from path
  const pathParts = page.path ? page.path.split(' / ') : [];

  return (
    <div className="p-12 max-w-4xl">
      {/* Breadcrumb */}
      {pathParts.length > 1 && (
        <div className="flex items-center gap-1 mb-6 flex-wrap" style={{ fontSize: '0.75rem' }}>
          {pathParts.map((part, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={10} className="text-slate-600" />}
              <span style={{ color: i === pathParts.length - 1 ? '#94a3b8' : '#475569' }}>{part}</span>
            </span>
          ))}
        </div>
      )}

      {/* Title + Open in Editor CTA */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          {page.icon && (
            <span style={{ fontSize: '2.5rem' }}>{page.icon}</span>
          )}
          <h1 className="text-5xl font-bold text-white leading-tight" style={{ fontFamily: 'monospace' }}>
            {page.title}
          </h1>
        </div>
        <button
          onClick={() => {
            // Open in editor - placeholder for Monaco integration
            window.dispatchEvent(new CustomEvent('open-in-editor', { detail: { pageId, title: page.title, content: page.content } }));
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono border rounded transition-all shrink-0 mt-2"
          style={{
            borderColor: ORANGE + '60',
            color: ORANGE,
            background: ORANGE + '10',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = ORANGE + '20'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ORANGE + '10'; }}
        >
          <Code2 size={12} /> Open in Editor
        </button>
      </div>

      {/* Module code */}
      {page.module_code && (
        <div className="text-sm font-mono mb-6" style={{ color: ORANGE }}>{page.module_code}</div>
      )}

      {/* Content */}
      {page.content ? (
        <div
          className="prose prose-invert max-w-none mb-10"
          style={{
            '--tw-prose-body': '#94a3b8',
            '--tw-prose-headings': '#ffffff',
            '--tw-prose-code': ORANGE,
            '--tw-prose-pre-bg': 'rgba(255,255,255,0.05)',
          } as React.CSSProperties}
        >
          <ReactMarkdown>{page.content}</ReactMarkdown>
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw size={14} className="text-amber-500" />
            <span className="text-amber-400/70 text-sm font-mono">Content pending: run the content-fill sync to populate this page.</span>
          </div>
          <div className="space-y-2 text-slate-600 text-xs font-mono">
            <div># {page.title}</div>
            <div className="opacity-60">## Status: PENDING_CONTENT</div>
            {page.module_code && <div className="opacity-60">## Module: {page.module_code}</div>}
            <div className="opacity-60">## Type: {page.page_type}</div>
          </div>
        </div>
      )}

      {/* Child pages as navigation links */}
      {children.length > 0 && (
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-4">
            <FolderOpen size={14} style={{ color: ORANGE }} />
            <span className="text-xs font-mono font-semibold tracking-wider" style={{ color: '#64748b' }}>
              {children.length} CHILD {children.length === 1 ? 'PAGE' : 'PAGES'}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {children.map(child => (
              <ChildPageCard
                key={child.id}
                page={child}
                onClick={() => onPageSelect?.(child.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
