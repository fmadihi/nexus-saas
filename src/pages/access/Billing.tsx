// import { useQuery } from "@tanstack/react-query";
// import { api } from "../../lib/api";
// import type { Invoice, Org } from "../../types";
// import Card from "../../components/ui/Card";
// import Badge from "../../components/ui/Badge";
// import Button from "../../components/ui/Button";
// import { useAuth } from "../../context/AuthContext";

// export default function Billing() {
//   const { org } = useAuth();
//   const invoices = useQuery({
//     queryKey: ["invoices", org?.id],
//     queryFn: () => api<Invoice[]>(`/invoices?orgId=${org?.id}`),
//   });

//   const exportCsv = () => {
//     const rows = (invoices.data ?? [])
//       .map((i) => `${i.id},${i.amount},${i.status},${i.date}`)
//       .join("\n");
//     const blob = new Blob([`id,amount,status,date\n${rows}`], {
//       type: "text/csv",
//     });
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob);
//     a.download = "invoices.csv";
//     a.click();
//   };

//   return (
//     <div className="space-y-4">
//       <Card className="flex items-center justify-between">
//         <div>
//           <h1 className="text-xl font-bold">پلن فعلی</h1>
//           <Badge color="green">{org?.plan}</Badge>
//         </div>
//         <Button onClick={exportCsv}>Export CSV</Button>
//       </Card>
//       <Card>
//         <h2 className="mb-3 font-semibold">فاکتورهای گذشته</h2>
//         <table className="w-full text-sm">
//           <thead className="text-slate-500">
//             <tr>
//               <th className="p-2 text-right">شماره</th>
//               <th className="p-2 text-right">مبلغ</th>
//               <th className="p-2 text-right">وضعیت</th>
//               <th className="p-2 text-right">تاریخ</th>
//             </tr>
//           </thead>
//           <tbody>
//             {(invoices.data ?? []).map((i) => (
//               <tr
//                 key={i.id}
//                 className="border-t border-slate-100 dark:border-slate-800"
//               >
//                 <td className="p-2">#{i.id}</td>
//                 <td className="p-2">€{i.amount}</td>
//                 <td className="p-2">
//                   <Badge color={i.status === "paid" ? "green" : "amber"}>
//                     {i.status}
//                   </Badge>
//                 </td>
//                 <td className="p-2 text-slate-500">
//                   {new Date(i.date).toLocaleDateString("fa-IR")}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Card>
//     </div>
//   );
// }
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import type { Invoice, Org } from "../../types";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function Billing() {
  const { org } = useAuth();
  const { t } = useTranslation();
  const invoices = useQuery({
    queryKey: ["invoices", org?.id],
    queryFn: () => api<Invoice[]>(`/invoices?orgId=${org?.id}`),
  });

  const exportCsv = () => {
    const rows = (invoices.data ?? []).map((i) => `${i.id},${i.amount},${i.status},${i.date}`).join("\n");
    const blob = new Blob([`id,amount,status,date\n${rows}`], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "invoices.csv";
    a.click();
  };

  return (
    <div className="space-y-4">
      <Card className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[var(--tx-base)]">{t("billing.title")}</h1>
          <Badge color="green" className="mt-1">{org?.plan}</Badge>
        </div>
        <Button onClick={exportCsv}>{t("common.exportCsv")}</Button>
      </Card>
      <Card>
        <h2 className="mb-4 font-semibold text-[var(--tx-base)]">{t("billing.pastInvoices")}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {["billing.number","billing.amount","billing.status","billing.date"].map(k => (
                  <th key={k} className="p-3 text-start text-xs font-medium uppercase tracking-wide text-[var(--tx-muted)]">{t(k)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {(invoices.data ?? []).map((i) => (
                <tr key={i.id} className="hover:bg-[var(--bg-subtle)] transition-colors">
                  <td className="p-3 font-medium">#{i.id}</td>
                  <td className="p-3">€{i.amount}</td>
                  <td className="p-3"><Badge color={i.status === "paid" ? "green" : "amber"}>{i.status}</Badge></td>
                  <td className="p-3 text-[var(--tx-muted)]">{new Date(i.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
