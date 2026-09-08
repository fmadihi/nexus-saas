// type Variant = "primary" | "secondary" | "danger" | "ghost";
// const styles: Record<Variant, string> = {
//   primary: "bg-blue-600 text-white hover:bg-blue-700",
//   secondary:
//     "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
//   danger: "bg-red-600 text-white hover:bg-red-700",
//   ghost: "hover:bg-slate-100 dark:hover:bg-slate-800",
// };
// export default function Button({
//   variant = "primary",
//   className = "",
//   ...props
// }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
//   return (
//     <button
//       className={`rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50 ${styles[variant]} ${className}`}
//       {...props}
//     />
//   );
// }
import { type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--r-md)] px-4 py-2 text-sm font-medium transition-all duration-[var(--dur)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--a-500)] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--a-500)] text-white hover:bg-[var(--a-600)] active:bg-[var(--a-700)] shadow-[var(--shadow-sm)]",
  secondary:
    "border border-[var(--border-strong)] bg-[var(--bg-raised)] text-[var(--tx-base)] hover:bg-[var(--bg-subtle)] active:bg-[var(--n-200)]",
  danger:
    "bg-[var(--danger)] text-white hover:opacity-90 active:opacity-100 shadow-[var(--shadow-sm)]",
  ghost:
    "text-[var(--tx-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--tx-base)]",
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: Props) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
