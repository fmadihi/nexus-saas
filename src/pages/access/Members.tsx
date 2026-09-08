// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { api, updateItem, deleteItem } from "../../lib/api";
// import type { User, Role } from "../../types";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Badge from "../../components/ui/Badge";
// import { useAuth } from "../../context/AuthContext";

// const roleColor: Record<Role, "blue" | "amber" | "gray"> = {
//   admin: "blue",
//   manager: "amber",
//   user: "gray",
// };

// export default function Members() {
//   const { user: me, org } = useAuth();
//   const qc = useQueryClient();
//   const { data: members } = useQuery({
//     queryKey: ["members", org?.id],
//     queryFn: () => api<User[]>(`/users?orgId=${org?.id}`),
//   });

//   const changeRole = useMutation({
//     mutationFn: ({ id, role }: { id: string; role: Role }) =>
//       updateItem<User>("users", id, { role }),
//     onSuccess: () => qc.invalidateQueries({ queryKey: ["members"] }),
//   });
//   const remove = useMutation({
//     mutationFn: (id: string) => deleteItem("users", id),
//     onSuccess: () => qc.invalidateQueries({ queryKey: ["members"] }),
//   });

//   return (
//     <Card>
//       <h1 className="mb-4 text-2xl font-bold">اعضای تیم</h1>
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="text-slate-500">
//             <tr>
//               <th className="p-2 text-right">نام</th>
//               <th className="p-2 text-right">ایمیل</th>
//               <th className="p-2 text-right">نقش</th>
//               <th className="p-2 text-right">تاریخ عضویت</th>
//               <th className="p-2">عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {(members ?? []).map((u) => (
//               <tr
//                 key={u.id}
//                 className="border-t border-slate-100 dark:border-slate-800"
//               >
//                 <td className="p-2">{u.name}</td>
//                 <td className="p-2 text-slate-500">{u.email}</td>
//                 <td className="p-2">
//                   <Badge color={roleColor[u.role]}>{u.role}</Badge>
//                 </td>
//                 <td className="p-2 text-slate-500">
//                   {new Date(u.joinedAt).toLocaleDateString("fa-IR")}
//                 </td>
//                 <td className="p-2">
//                   {me?.role === "admin" ? (
//                     <div className="flex gap-1">
//                       <select
//                         value={u.role}
//                         onChange={(e) =>
//                           changeRole.mutate({
//                             id: u.id,
//                             role: e.target.value as Role,
//                           })
//                         }
//                         className="rounded border border-slate-300 px-1 text-xs dark:border-slate-700 dark:bg-slate-900"
//                       >
//                         <option value="admin">admin</option>
//                         <option value="manager">manager</option>
//                         <option value="user">user</option>
//                       </select>
//                       <Button
//                         variant="danger"
//                         className="text-xs"
//                         onClick={() => remove.mutate(u.id)}
//                       >
//                         حذف
//                       </Button>
//                     </div>
//                   ) : (
//                     <span className="text-xs text-slate-400">بدون دسترسی</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </Card>
//   );
// }
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, updateItem, deleteItem } from "../../lib/api";
import type { User, Role } from "../../types";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const roleColor: Record<Role, "blue" | "amber" | "gray"> = {
  admin: "blue", manager: "amber", user: "gray",
};

export default function Members() {
  const { user: me, org } = useAuth();
  const { t } = useTranslation();
  const qc = useQueryClient();
  const { data: members } = useQuery({
    queryKey: ["members", org?.id],
    queryFn: () => api<User[]>(`/users?orgId=${org?.id}`),
  });
  const changeRole = useMutation({
    mutationFn: ({ id, role }: { id: string; role: Role }) => updateItem<User>("users", id, { role }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["members"] }),
  });
  const remove = useMutation({
    mutationFn: (id: string) => deleteItem("users", id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["members"] }),
  });

  return (
    <Card>
      <h1 className="mb-5 text-2xl font-bold text-[var(--tx-base)]">{t("members.title")}</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["members.name","members.email","members.role","members.joinedAt","members.actions"].map(k => (
                <th key={k} className="p-3 text-start text-xs font-medium uppercase tracking-wide text-[var(--tx-muted)]">{t(k)}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {(members ?? []).map((u) => (
              <tr key={u.id} className="hover:bg-[var(--bg-subtle)] transition-colors">
                <td className="p-3 font-medium text-[var(--tx-base)]">{u.name}</td>
                <td className="p-3 text-[var(--tx-muted)]">{u.email}</td>
                <td className="p-3"><Badge color={roleColor[u.role]}>{u.role}</Badge></td>
                <td className="p-3 text-[var(--tx-muted)]">{new Date(u.joinedAt).toLocaleDateString()}</td>
                <td className="p-3">
                  {me?.role === "admin" ? (
                    <div className="flex gap-2">
                      <select
                        value={u.role}
                        onChange={(e) => changeRole.mutate({ id: u.id, role: e.target.value as Role })}
                        className="rounded-[var(--r-sm)] border border-[var(--border)] bg-[var(--bg-raised)] px-2 py-1 text-xs text-[var(--tx-base)] focus:outline-none"
                      >
                        <option value="admin">admin</option>
                        <option value="manager">manager</option>
                        <option value="user">user</option>
                      </select>
                      <Button variant="danger" className="text-xs py-1 px-2" onClick={() => remove.mutate(u.id)}>
                        {t("common.delete")}
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs text-[var(--tx-faint)]">{t("common.noAccess")}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
