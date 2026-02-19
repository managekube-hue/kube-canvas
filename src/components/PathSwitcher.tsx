import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePath, UserPath } from "@/context/PathContext";
import { ChevronDown } from "lucide-react";

/** DO NOT TOUCH — PathSwitcher — #993619 only, no green */

const ORANGE = "#993619";

const PATHS: { id: UserPath; label: string; desc: string }[] = [
  { id: "fully-managed",  label: "Fully Managed",  desc: "We run it. You own the outcomes." },
  { id: "co-managed",     label: "Co-Managed",     desc: "Your team runs it. Our platform backs you." },
  { id: "self-managed",   label: "Self-Managed",   desc: "You run it. The platform stays out of the way." },
];

export const PathSwitcher = () => {
  const { path, setPath } = usePath();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        className="flex items-center gap-2 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors"
        style={{ color: "rgba(205,202,197,0.45)", letterSpacing: "0.12em" }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = ORANGE}
        onMouseLeave={e => !open && ((e.currentTarget as HTMLElement).style.color = "rgba(205,202,197,0.45)")}
      >
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ORANGE }} />
        Viewing: {current.label}
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-2 w-72 z-50 overflow-hidden shadow-2xl"
          style={{ background: "#111111", border: "1px solid rgba(205,202,197,0.08)" }}
        >
          {PATHS.map(p => (
            <button
              key={p.id}
              onClick={() => choose(p)}
              className="w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors"
              style={{ borderBottom: "1px solid rgba(205,202,197,0.05)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(153,54,25,0.06)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: ORANGE }} />
              <div>
                <p className="text-[12px] font-bold text-white">{p.label}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "rgba(205,202,197,0.35)" }}>{p.desc}</p>
              </div>
            </button>
          ))}
          <div className="px-4 py-3">
            <button
              onClick={() => { navigate("/"); setOpen(false); }}
              className="text-[11px] transition-colors"
              style={{ color: "rgba(205,202,197,0.25)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = ORANGE}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(205,202,197,0.25)"}
            >
              ← Change your path
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
/** END DO NOT TOUCH */
