import { useState } from "react";
import { ShoppingCart, X, Trash2 } from "lucide-react";
import { useBOMCart } from "@/context/BOMCartContext";
import { Link } from "react-router-dom";

/** DO NOT TOUCH — Floating BOM Cart Button */

export const BOMCart = () => {
  const { items, removeItem, clearCart, count } = useBOMCart();
  const [open, setOpen] = useState(false);

  if (count === 0 && !open) return null;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 font-bold text-[13px] text-white shadow-2xl transition-all hover:opacity-90"
        style={{ background: "#993619", letterSpacing: "0.06em" }}
      >
        <ShoppingCart size={16} />
        BOM
        <span
          className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-black rounded-full"
          style={{ background: "rgba(255,255,255,0.2)" }}
        >
          {count}
        </span>
      </button>

      {/* Cart drawer */}
      {open && (
        <div
          className="fixed bottom-20 right-6 z-50 w-80 max-h-[60vh] flex flex-col overflow-hidden shadow-2xl"
          style={{ background: "#141414", border: "1px solid rgba(205,202,197,0.1)" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid rgba(205,202,197,0.08)" }}
          >
            <span className="text-[12px] font-bold uppercase tracking-widest text-white" style={{ letterSpacing: "0.14em" }}>
              Bill of Materials
            </span>
            <button onClick={() => setOpen(false)}>
              <X size={16} style={{ color: "rgba(205,202,197,0.4)" }} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto py-2">
            {items.length === 0 ? (
              <p className="px-5 py-6 text-[13px]" style={{ color: "rgba(205,202,197,0.35)" }}>
                No items in your BOM yet.
              </p>
            ) : (
              items.map(item => (
                <div
                  key={item.id}
                  className="flex items-start justify-between px-5 py-3"
                  style={{ borderBottom: "1px solid rgba(205,202,197,0.05)" }}
                >
                  <div className="flex-1 pr-3">
                    <p className="text-[13px] font-semibold text-white leading-snug">{item.name}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "rgba(205,202,197,0.35)" }}>
                      {item.vendor} · {item.type}
                    </p>
                  </div>
                  <button onClick={() => removeItem(item.id)}>
                    <Trash2 size={13} style={{ color: "rgba(205,202,197,0.3)" }} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{ borderTop: "1px solid rgba(205,202,197,0.08)" }}
            >
              <Link
                to="/assessment"
                className="flex-1 py-2.5 text-center text-[12px] font-bold uppercase tracking-wider text-white transition-all hover:opacity-90"
                style={{ background: "#993619", letterSpacing: "0.1em" }}
                onClick={() => setOpen(false)}
              >
                Request Quote
              </Link>
              <button
                onClick={clearCart}
                className="px-3 py-2.5 text-[12px] transition-colors"
                style={{ color: "rgba(205,202,197,0.35)", border: "1px solid rgba(205,202,197,0.1)" }}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
/** END DO NOT TOUCH */
