// export default function EmptyState({ title, description }: { title: string; description?: string }) {
//   return (
//     <div className="flex flex-col items-center gap-2 py-16 text-center">
//       <div className="text-4xl">🗂️</div>
//       <h3 className="font-semibold">{title}</h3>
//       {description && <p className="text-sm text-slate-500">{description}</p>}
//     </div>
//   );
// }

import { FolderOpen } from "lucide-react";

export default function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="rounded-full bg-[var(--bg-subtle)] p-4">
        <FolderOpen className="h-8 w-8 text-[var(--tx-faint)]" />
      </div>
      <p className="font-semibold text-[var(--tx-base)]">{title}</p>
      <p className="max-w-xs text-sm text-[var(--tx-muted)]">{description}</p>
    </div>
  );
}
