import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePath, UserPath } from "@/context/PathContext";
import { ChevronDown } from "lucide-react";

const PATHS: { id: UserPath; label: string; desc: string; color: string }[] = [
  { id: "fully-managed",  label: "Fully Managed",  desc: "We run it. You own the outcomes.",           color: "hsl(24,95%,53%)" },
  { id: "co-managed",     label: "Co-Managed",     desc: "Your team runs it. Our platform backs you.", color: "hsl(210,70%,55%)" },
  { id: "self-managed",   label: "Self-Managed",   desc: "You run it. The platform stays out of the way.", color: "hsl(145,60%,45%)" },
];

export const PathSwitcher = () => {
  const { path, setPath } = usePath();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Click-outside close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const current = PATHS.find(p => p.id === path) ?? PATHS[0];

  const choose = (p: typeof PATHS[0]) => {
    setPath(p.id);
    navigate(`/${p.id}`);
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-4 py-2 rounded text-[13px] font-semibold transition-colors border"
        style={{ borderColor: `${current.color}40`, color: current.color, background: `${current.color}10` }}
      >
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: current.color }} />
        Viewing: {current.label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-2 w-72 border border-white/10 z-50 overflow-hidden shadow-xl"
          style={{ background: "#111111" }}
        >
          {PATHS.map(p => (
            <button
              key={p.id}
              onClick={() => choose(p)}
              className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors"
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: p.color }} />
              <div>
                <p className="text-[13px] font-bold text-white">{p.label}</p>
                <p className="text-[11px] text-white/40 mt-0.5">{p.desc}</p>
              </div>
            </button>
          ))}
          <div className="border-t border-white/[0.06] px-4 py-3">
            <button
              onClick={() => { navigate("/"); setOpen(false); }}
              className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
            >
              Choose Your Path →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
