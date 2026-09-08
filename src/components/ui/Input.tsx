
// export default function Input({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
//   return (
//     <label className="block space-y-1">
//       <span className="text-sm font-medium">{label}</span>
//       <input className={`w-full rounded-lg border px-3 py-2 bg-white dark:bg-slate-900 ${error ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'}`} {...props} />
//       {error && <span className="text-xs text-red-500">{error}</span>}
//     </label>
//   );
// }

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(({ label, error, className, ...rest }, ref) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-sm font-medium text-[var(--tx-base)]">
        {label}
      </label>
    )}
    <input
      ref={ref}
      className={cn(
        "w-full rounded-[var(--r-md)] border px-3 py-2 text-sm",
        "bg-[var(--bg-raised)] text-[var(--tx-base)]",
        "placeholder:text-[var(--tx-faint)]",
        "transition-colors duration-[var(--dur)]",
        error
          ? "border-[var(--danger)] focus:ring-2 focus:ring-red-400/30"
          : "border-[var(--border)] focus:border-[var(--a-500)] focus:ring-2 focus:ring-[var(--a-500)]/20",
        "outline-none",
        className
      )}
      {...rest}
    />
    {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
  </div>
));

Input.displayName = "Input";
export default Input;
