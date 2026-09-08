// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { fetchPaged, deleteItem } from "../../lib/api";
// import type { Project } from "../../types";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Badge from "../../components/ui/Badge";
// import Modal from "../../components/ui/Modal";
// import { Skeleton } from "../../components/ui/Skeleton";
// import EmptyState from "../../components/ui/EmptyState";
// import { useAuth } from "../../context/AuthContext";

// export default function Projects() {
//   const { user, org } = useAuth();
//   const [page, setPage] = useState(1);
//   const [q, setQ] = useState("");
//   const [adding, setAdding] = useState(false);
//   const [name, setName] = useState("");
//   const qc = useQueryClient();

//   const { data, isLoading } = useQuery({
//     queryKey: ["projects", page, q, org?.id],
//     queryFn: () => fetchPaged<Project>("projects", page, 6, q),
//   });
//   const remove = useMutation({
//     mutationFn: (id: string) => deleteItem("projects", id),
//     onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
//   });

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <h1 className="text-2xl font-bold">پروژه‌ها</h1>
//         <div className="flex gap-2">
//           <input
//             value={q}
//             onChange={(e) => {
//               setQ(e.target.value);
//               setPage(1);
//             }}
//             placeholder="جست‌وجو…"
//             className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
//           />
//           {user?.role !== "user" && (
//             <Button onClick={() => setAdding(true)}>+ پروژه جدید</Button>
//           )}
//         </div>
//       </div>
//       {isLoading ? (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {[...Array(3)].map((_, i) => (
//             <Skeleton key={i} className="h-32" />
//           ))}
//         </div>
//       ) : !data?.data.length ? (
//         <EmptyState
//           title="پروژه‌ای یافت نشد"
//           description="اولین پروژه خود را بسازید یا عبارت جست‌وجو را تغییر دهید."
//         />
//       ) : (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {data.data.map((p) => (
//             <Card key={p.id}>
//               <div className="flex items-center justify-between">
//                 <h3 className="font-semibold">{p.name}</h3>
//                 <Badge color="blue">{p.status}</Badge>
//               </div>
//               <p className="mt-2 text-sm text-slate-500">
//                 بودجه: €{p.budget.toLocaleString()}
//               </p>
//               <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
//                 <div
//                   className="h-2 rounded-full bg-blue-600"
//                   style={{ width: `${p.progress}%` }}
//                 />
//               </div>
//               {user?.role === "admin" && (
//                 <Button
//                   variant="danger"
//                   className="mt-3 text-xs"
//                   onClick={() => remove.mutate(p.id)}
//                 >
//                   حذف
//                 </Button>
//               )}
//             </Card>
//           ))}
//         </div>
//       )}
//       <div className="flex justify-center gap-2">
//         <Button
//           variant="secondary"
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//         >
//           قبلی
//         </Button>
//         <span className="py-2 text-sm">صفحه {page}</span>
//         <Button
//           variant="secondary"
//           disabled={(data?.data.length ?? 0) < 6}
//           onClick={() => setPage((p) => p + 1)}
//         >
//           بعدی
//         </Button>
//       </div>
//       <Modal open={adding} onClose={() => setAdding(false)} title="پروژه جدید">
//         <div className="space-y-3">
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="نام پروژه"
//             className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
//           />
//           <Button
//             className="w-full"
//             onClick={async () => {
//               await fetch("http://localhost:3001/projects", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                   orgId: org?.id,
//                   name,
//                   status: "active",
//                   budget: 0,
//                   progress: 0,
//                 }),
//               });
//               setAdding(false);
//               setName("");
//               qc.invalidateQueries({ queryKey: ["projects"] });
//             }}
//           >
//             ثبت
//           </Button>
//         </div>
//       </Modal>
//     </div>
//   );
// }
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPaged, deleteItem, api } from "../../lib/api";
import type { Project } from "../../types";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import { Skeleton } from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { user, org } = useAuth();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["projects", page, q, org?.id],
    queryFn: () => fetchPaged<Project>("projects", page, 6, q),
  });
  const remove = useMutation({
    mutationFn: (id: string) => deleteItem("projects", id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-[var(--tx-base)]">{t("projects.title")}</h1>
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            placeholder={t("common.search")}
            className="rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-raised)] px-3 py-2 text-sm text-[var(--tx-base)] placeholder:text-[var(--tx-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--a-500)]/30"
          />
          {user?.role !== "user" && (
            <Button onClick={() => setAdding(true)}>{t("projects.newProject")}</Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-36" />)}
        </div>
      ) : !data?.data.length ? (
        <EmptyState title={t("projects.notFound")} description={t("projects.notFoundDesc")} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((p) => (
            <Card key={p.id} className="hover:shadow-[var(--shadow-md)] transition-shadow">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-[var(--tx-base)]">{p.name}</h3>
                <Badge color="blue">{p.status}</Badge>
              </div>
              <p className="mt-2 text-sm text-[var(--tx-muted)]">
                {t("projects.budget")}: €{p.budget.toLocaleString()}
              </p>
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs text-[var(--tx-faint)]">
                  <span>{p.progress}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[var(--bg-subtle)]">
                  <div
                    className="h-1.5 rounded-full bg-[var(--a-500)] transition-all duration-500"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
              {user?.role === "admin" && (
                <Button variant="danger" className="mt-4 w-full text-xs" onClick={() => remove.mutate(p.id)}>
                  {t("common.delete")}
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          {t("common.prev")}
        </Button>
        <span className="px-2 text-sm text-[var(--tx-muted)]">{t("common.page")} {page}</span>
        <Button variant="secondary" disabled={(data?.data.length ?? 0) < 6} onClick={() => setPage((p) => p + 1)}>
          {t("common.next")}
        </Button>
      </div>

      <Modal open={adding} onClose={() => setAdding(false)} title={t("projects.modal.title")}>
        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("projects.modal.namePlaceholder")}
            className="w-full rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-raised)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--a-500)]/30"
          />
          <Button
            className="w-full"
            onClick={async () => {
              await api("/projects", {
                method: "POST",
                body: JSON.stringify({ orgId: org?.id, name, status: "active", budget: 0, progress: 0 }),
              });
              setAdding(false);
              setName("");
              qc.invalidateQueries({ queryKey: ["projects"] });
            }}
          >
            {t("projects.modal.submit")}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
