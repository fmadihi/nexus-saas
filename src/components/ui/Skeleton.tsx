// export function Skeleton({ className = "" }: { className?: string }) {
//   return (
//     <div
//       className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800 ${className}`}
//     />
//   );
// }
import { cn } from "../../lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[var(--r-md)] bg-[var(--n-200)] dark:bg-[var(--n-800)]",
        className
      )}
    />
  );
}
