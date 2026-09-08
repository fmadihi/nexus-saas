// export default function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
//       <div className="w-full max-w-lg rounded-2xl bg-white p-6 dark:bg-slate-900" onClick={e => e.stopPropagation()}>
//         <div className="mb-4 flex items-center justify-between">
//           <h2 className="text-lg font-semibold">{title}</h2>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// }
import { type ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={cn(
          "relative z-10 w-full max-w-md rounded-[var(--r-xl)]",
          "border border-[var(--border)] bg-[var(--bg-raised)]",
          "shadow-[var(--shadow-lg)] p-6",
          "animate-in fade-in slide-in-from-bottom-4 duration-200"
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="modal-title" className="text-base font-semibold text-[var(--tx-base)]">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-[var(--r-sm)] p-1 text-[var(--tx-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--tx-base)] transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
