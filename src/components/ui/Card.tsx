// export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
//   return <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}>{children}</div>;
// }
import { type ReactNode } from "react";
import { cn } from "../../lib/cn";

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-raised)]",
        "p-5 shadow-[var(--shadow-sm)] transition-shadow duration-[var(--dur)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
