import ReactMarkdown from 'react-markdown';
import { usePageContent } from '@/hooks/useDocumentation';
import { FileText, ChevronRight } from 'lucide-react';

const ORANGE = 'hsl(24 95% 53%)';

interface PageViewerProps {
  pageId: string | null;
}

export function PageViewer({ pageId }: PageViewerProps) {
  const { page, loading } = usePageContent(pageId || '');

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

      {/* Title */}
      <div className="flex items-center gap-4 mb-8">
        {page.icon && (
          <span style={{ fontSize: '2.5rem' }}>{page.icon}</span>
        )}
        <h1 className="text-5xl font-bold text-white leading-tight" style={{ fontFamily: 'monospace' }}>
          {page.title}
        </h1>
      </div>

      {/* Module code */}
      {page.module_code && (
        <div className="text-sm font-mono mb-6" style={{ color: ORANGE }}>{page.module_code}</div>
      )}

      {/* Content */}
      {page.content ? (
        <div
          className="prose prose-invert max-w-none"
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
        <div className="rounded-xl border border-white/10 bg-white/5 p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-slate-400 text-sm font-mono">Pending Notion sync — this page will populate after the Edge Function runs.</span>
          </div>
          <div className="space-y-3 text-slate-500 text-sm font-mono">
            <div># {page.title}</div>
            <div className="opacity-50">## Status: PENDING_SYNC</div>
            {page.module_code && <div className="opacity-50">## Module: {page.module_code}</div>}
            <div className="opacity-50">## Type: {page.page_type}</div>
          </div>
        </div>
      )}
    </div>
  );
}
