// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { api, updateItem } from "../../lib/api";
// import type { Task, TaskStatus } from "../../types";
// import Card from "../../components/ui/Card";
// import Badge from "../../components/ui/Badge";
// import { useAuth } from "../../context/AuthContext";

// const columns: {
//   key: TaskStatus;
//   label: string;
//   color: "gray" | "blue" | "amber" | "green";
// }[] = [
//   { key: "todo", label: "To Do", color: "gray" },
//   { key: "inprogress", label: "In Progress", color: "blue" },
//   { key: "review", label: "Under Review", color: "amber" },
//   { key: "done", label: "Done", color: "green" },
// ];

// export default function Tasks() {
//   const { user, org } = useAuth();
//   const qc = useQueryClient();
//   const { data: tasks } = useQuery({
//     queryKey: ["tasks", org?.id],
//     queryFn: () => api<Task[]>(`/tasks?orgId=${org?.id}`),
//   });
//   const move = useMutation({
//     mutationFn: ({ id, status }: { id: string; status: TaskStatus }) =>
//       updateItem<Task>("tasks", id, { status }),
//     onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
//   });

//   const visible = (tasks ?? []).filter(
//     (t) => user?.role !== "user" || t.assigneeId === user.id,
//   );

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-bold">برد تسک‌ها</h1>
//       <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//         {columns.map((c) => (
//           <div
//             key={c.key}
//             className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900"
//           >
//             <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
//               <Badge color={c.color}>{c.label}</Badge>{" "}
//               {visible.filter((t) => t.status === c.key).length}
//             </h2>
//             <div className="space-y-2">
//               {visible
//                 .filter((t) => t.status === c.key)
//                 .map((t) => (
//                   <Card key={t.id} className="!p-3">
//                     <p className="text-sm font-medium">{t.title}</p>
//                     <div className="mt-2 flex flex-wrap gap-1">
//                       {t.tags.map((tag) => (
//                         <Badge key={tag} color="gray">
//                           {tag}
//                         </Badge>
//                       ))}
//                     </div>
//                     <div className="mt-2 flex gap-1">
//                       {columns
//                         .filter((x) => x.key !== t.key)
//                         .map((x) => (
//                           <button
//                             key={x.key}
//                             onClick={() =>
//                               move.mutate({ id: t.id, status: x.key })
//                             }
//                             className="rounded px-1.5 py-0.5 text-[10px] text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
//                           >
//                             → {x.label}
//                           </button>
//                         ))}
//                     </div>
//                   </Card>
//                 ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, updateItem } from "../../lib/api";
import type { Task, TaskStatus } from "../../types";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function Tasks() {
  const { user, org } = useAuth();
  const { t } = useTranslation();
  const qc = useQueryClient();

  const columns: { key: TaskStatus; label: string; color: "gray" | "blue" | "amber" | "green" }[] = [
    { key: "todo",       label: t("tasks.todo"),       color: "gray" },
    { key: "inprogress", label: t("tasks.inprogress"), color: "blue" },
    { key: "review",     label: t("tasks.review"),     color: "amber" },
    { key: "done",       label: t("tasks.done"),       color: "green" },
  ];

  const { data: tasks } = useQuery({
    queryKey: ["tasks", org?.id],
    queryFn: () => api<Task[]>(`/tasks?orgId=${org?.id}`),
  });
  const move = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TaskStatus }) => updateItem<Task>("tasks", id, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const visible = (tasks ?? []).filter((t_) => user?.role !== "user" || t_.assigneeId === user.id);

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-[var(--tx-base)]">{t("tasks.title")}</h1>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((c) => (
          <div key={c.key} className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-subtle)] p-3">
            <div className="mb-3 flex items-center justify-between">
              <Badge color={c.color}>{c.label}</Badge>
              <span className="text-xs font-medium text-[var(--tx-muted)]">
                {visible.filter((t_) => t_.status === c.key).length}
              </span>
            </div>
            <div className="space-y-2">
              {visible.filter((t_) => t_.status === c.key).map((t_) => (
                <Card key={t_.id} className="!p-3">
                  <p className="text-sm font-medium text-[var(--tx-base)]">{t_.title}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {t_.tags.map((tag) => <Badge key={tag} color="gray">{tag}</Badge>)}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {columns.filter((x) => x.key !== c.key).map((x) => (
                      <button
                        key={x.key}
                        onClick={() => move.mutate({ id: t_.id, status: x.key })}
                        className="rounded px-1.5 py-0.5 text-[10px] text-[var(--tx-muted)] hover:bg-[var(--border)] transition-colors"
                      >
                        → {x.label}
                      </button>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
