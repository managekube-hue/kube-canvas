import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { kdocsTree, getExtColor } from "@/data/kdocs-tree";
import { ChevronDown, ChevronRight, FileText, Folder, FolderOpen, Menu, X, BookOpen, Sparkles } from "lucide-react";

const FileIcon = ({ ext }: { ext?: string }) => {
  const color = getExtColor(ext);
  return <FileText size={11} className={color} />;
};

export const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "k-core-01": true,
    "k-map-11": true,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggle = (id: string) =>
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));

  const SidebarContent = () => (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border flex-shrink-0">
        <Link to="/docs" className="flex items-center gap-2 mb-1">
          <BookOpen size={14} className="text-brand-orange" />
          <span className="text-[11px] font-black tracking-widest uppercase text-foreground">K-DOCS</span>
        </Link>
        <p className="text-[10px] text-muted-foreground">Kubric Orchestration Reference</p>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto py-3 font-mono">
        {kdocsTree.map(section => {
          const isOpen = !!openSections[section.id];
          return (
            <div key={section.id} className="mb-0.5">
              {/* Section header */}
              <button
                onClick={() => toggle(section.id)}
                className="w-full flex items-center gap-1.5 px-4 py-1.5 text-left hover:bg-secondary/50 transition-colors group"
              >
                {isOpen
                  ? <FolderOpen size={12} style={{ color: section.color }} className="flex-shrink-0" />
                  : <Folder size={12} style={{ color: section.color }} className="flex-shrink-0" />
                }
                <span className="text-[10px] font-bold tracking-widest uppercase flex-1 truncate" style={{ color: section.color }}>
                  {section.code}
                </span>
                {isOpen
                  ? <ChevronDown size={10} className="text-muted-foreground/50 flex-shrink-0" />
                  : <ChevronRight size={10} className="text-muted-foreground/50 flex-shrink-0" />
                }
              </button>

              {isOpen && (
                <div className="ml-4 border-l border-border/50 pl-0">
                  {section.children.map(group => {
                    const groupKey = `${section.id}--${group.id}`;
                    const groupOpen = openSections[groupKey] !== false; // default open
                    return (
                      <div key={group.id}>
                        <button
                          onClick={() => toggle(groupKey)}
                          className="w-full flex items-center gap-1.5 px-3 py-1 text-left hover:bg-secondary/30 transition-colors"
                        >
                          {groupOpen
                            ? <FolderOpen size={10} className="text-muted-foreground flex-shrink-0" />
                            : <Folder size={10} className="text-muted-foreground flex-shrink-0" />
                          }
                          <span className="text-[10px] text-muted-foreground font-medium flex-1 truncate">
                            {group.code}
                          </span>
                          {group.isNew && (
                            <Sparkles size={8} className="text-brand-orange flex-shrink-0" />
                          )}
                          {groupOpen
                            ? <ChevronDown size={9} className="text-muted-foreground/40 flex-shrink-0" />
                            : <ChevronRight size={9} className="text-muted-foreground/40 flex-shrink-0" />
                          }
                        </button>

                        {groupOpen && (
                          <div className="ml-3 border-l border-border/30 pl-0">
                            {/* Direct files */}
                            {group.files?.map(file => (
                              <div
                                key={file.id}
                                className="flex items-center gap-1.5 px-3 py-0.5 text-left hover:bg-secondary/20 transition-colors"
                              >
                                <FileIcon ext={file.ext} />
                                <span className="text-[9px] text-muted-foreground/70 font-mono truncate flex-1">
                                  {file.code}
                                </span>
                                {file.isNew && <Sparkles size={7} className="text-brand-orange flex-shrink-0" />}
                              </div>
                            ))}
                            {/* Subgroups */}
                            {group.subGroups?.map(sub => {
                              const subKey = `${groupKey}--${sub.id}`;
                              const subOpen = openSections[subKey] !== false;
                              return (
                                <div key={sub.id}>
                                  <button
                                    onClick={() => toggle(subKey)}
                                    className="w-full flex items-center gap-1.5 px-3 py-0.5 text-left hover:bg-secondary/20 transition-colors"
                                  >
                                    {subOpen
                                      ? <FolderOpen size={9} className="text-muted-foreground/60 flex-shrink-0" />
                                      : <Folder size={9} className="text-muted-foreground/60 flex-shrink-0" />
                                    }
                                    <span className="text-[9px] text-muted-foreground/60 flex-1 truncate font-mono">
                                      {sub.code}
                                    </span>
                                    {sub.isNew && <Sparkles size={7} className="text-brand-orange flex-shrink-0" />}
                                  </button>
                                  {subOpen && (
                                    <div className="ml-3 border-l border-border/20 pl-0">
                                      {sub.files.map(file => (
                                        <div
                                          key={file.id}
                                          className="flex items-center gap-1.5 px-3 py-0.5 hover:bg-secondary/10 transition-colors"
                                        >
                                          <FileIcon ext={file.ext} />
                                          <span className="text-[9px] text-muted-foreground/50 font-mono truncate flex-1">
                                            {file.code}
                                          </span>
                                          {file.isNew && <Sparkles size={7} className="text-brand-orange flex-shrink-0" />}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer counts */}
      <div className="px-5 py-3 border-t border-border flex-shrink-0">
        <p className="text-[9px] font-mono text-muted-foreground/50">120,000+ intelligence assets</p>
        <p className="text-[9px] font-mono text-muted-foreground/40">18 DR Modules · 11 Sections</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div style={{ height: "72px" }} />

      <div className="flex min-h-[calc(100vh-72px)]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-border bg-background sticky top-[72px] h-[calc(100vh-72px)] overflow-hidden">
          <SidebarContent />
        </aside>

        {/* Mobile toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 left-6 z-40 bg-foreground text-white p-3 shadow-lg"
          aria-label="Open docs navigation"
        >
          <Menu size={20} />
        </button>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="bg-background w-64 h-full border-r border-border overflow-hidden flex flex-col relative">
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-10"
              >
                <X size={18} />
              </button>
              <SidebarContent />
            </div>
            <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};
