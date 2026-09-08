// import { useQuery } from "@tanstack/react-query";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import { api } from "../../lib/api";
// import type { Task, Project, Activity } from "../../types";
// import Card from "../../components/ui/Card";
// import { Skeleton } from "../../components/ui/Skeleton";
// import { useAuth } from "../../context/AuthContext";

// export default function Dashboard() {
//   const { user, org } = useAuth();
//   const tasks = useQuery({
//     queryKey: ["tasks", org?.id],
//     queryFn: () => api<Task[]>(`/tasks?orgId=${org?.id}`),
//   });
//   const projects = useQuery({
//     queryKey: ["projects", org?.id],
//     queryFn: () => api<Project[]>(`/projects?orgId=${org?.id}`),
//   });
//   const activity = useQuery({
//     queryKey: ["activity", org?.id],
//     queryFn: () => api<Activity[]>(`/activity?orgId=${org?.id}&_sort=-at`),
//   });

//   if (tasks.isLoading || projects.isLoading)
//     return (
//       <div className="grid gap-4 md:grid-cols-4">
//         {[...Array(4)].map((_, i) => (
//           <Skeleton key={i} className="h-28" />
//         ))}
//       </div>
//     );

//   const t = tasks.data ?? [];
//   const done = t.filter((x) => x.status === "done").length;
//   const active = t.length - done;
//   const budget = (projects.data ?? []).reduce((s, p) => s + p.budget, 0);

//   const kpis = [
//     { label: "تسک‌های فعال", value: active },
//     {
//       label: "نرخ پیشرفت",
//       value: `${t.length ? Math.round((done / t.length) * 100) : 0}%`,
//     },
//     { label: "بودجه کل", value: `€${budget.toLocaleString()}` },
//     { label: "پروژه‌ها", value: projects.data?.length ?? 0 },
//   ];

//   const lineData = [
//     { month: "Apr", tasks: 8 },
//     { month: "May", tasks: 14 },
//     { month: "Jun", tasks: 11 },
//     { month: "Jul", tasks: 18 },
//     { month: "Aug", tasks: 15 },
//     { month: "Sep", tasks: done },
//   ];
//   const pieData = ["todo", "inprogress", "review", "done"].map((s) => ({
//     name: s,
//     value: t.filter((x) => x.status === s).length,
//   }));
//   const COLORS = ["#64748b", "#3b82f6", "#f59e0b", "#10b981"];

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">داشبورد — {org?.name}</h1>
//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         {kpis.map((k) => (
//           <Card key={k.label}>
//             <p className="text-sm text-slate-500">{k.label}</p>
//             <p className="mt-1 text-2xl font-bold">{k.value}</p>
//           </Card>
//         ))}
//       </div>
//       <div className="grid gap-4 lg:grid-cols-2">
//         <Card>
//           <h2 className="mb-4 font-semibold">تسک‌های تکمیل‌شده (۶ ماه)</h2>
//           <ResponsiveContainer width="100%" height={260}>
//             <LineChart data={lineData}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="tasks"
//                 stroke="#3b82f6"
//                 strokeWidth={2}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </Card>
//         <Card>
//           <h2 className="mb-4 font-semibold">توزیع وضعیت تسک‌ها</h2>
//           <ResponsiveContainer width="100%" height={260}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 dataKey="value"
//                 nameKey="name"
//                 innerRadius={55}
//                 outerRadius={90}
//               >
//                 {pieData.map((_, i) => (
//                   <Cell key={i} fill={COLORS[i]} />
//                 ))}
//               </Pie>
//               <Legend />
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </Card>
//       </div>
//       <Card>
//         <h2 className="mb-4 font-semibold">فعالیت‌های اخیر</h2>
//         <ul className="space-y-2 text-sm">
//           {(activity.data ?? []).map((a) => (
//             <li
//               key={a.id}
//               className="flex justify-between border-b border-slate-100 py-2 dark:border-slate-800"
//             >
//               <span>{a.text}</span>
//               <span className="text-slate-400">
//                 {new Date(a.at).toLocaleDateString("fa-IR")}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </Card>
//     </div>
//   );
// }
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { api } from "../../lib/api";
import type { Task, Project, Activity } from "../../types";
import Card from "../../components/ui/Card";
import { Skeleton } from "../../components/ui/Skeleton";
import { useAuth } from "../../context/AuthContext";

const COLORS = ["var(--a-400)", "var(--a-500)", "var(--a-600)", "var(--a-700)"];

export default function Dashboard() {
  const { org } = useAuth();
  const { t } = useTranslation();

  const tasks    = useQuery({ queryKey: ["tasks",    org?.id], queryFn: () => api<Task[]>(`/tasks?orgId=${org?.id}`) });
  const projects = useQuery({ queryKey: ["projects", org?.id], queryFn: () => api<Project[]>(`/projects?orgId=${org?.id}`) });
  const activity = useQuery({ queryKey: ["activity", org?.id], queryFn: () => api<Activity[]>(`/activity?orgId=${org?.id}&_sort=-at`) });

  if (tasks.isLoading || projects.isLoading)
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28" />)}
      </div>
    );

  const t_ = tasks.data ?? [];
  const done   = t_.filter((x) => x.status === "done").length;
  const active = t_.length - done;
  const budget = (projects.data ?? []).reduce((s, p) => s + p.budget, 0);

  const kpis = [
    { label: t("dashboard.activeTasks"),  value: active },
    { label: t("dashboard.progressRate"), value: `${t_.length ? Math.round((done / t_.length) * 100) : 0}%` },
    { label: t("dashboard.totalBudget"),  value: `€${budget.toLocaleString()}` },
    { label: t("dashboard.projects"),     value: projects.data?.length ?? 0 },
  ];

  const lineData = [
    { month: "Apr", tasks: 8 },
    { month: "May", tasks: 14 },
    { month: "Jun", tasks: 11 },
    { month: "Jul", tasks: 18 },
    { month: "Aug", tasks: 15 },
    { month: "Sep", tasks: done },
  ];

  const pieData = ["todo", "inprogress", "review", "done"].map((s) => ({
    name: s,
    value: t_.filter((x) => x.status === s).length,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--tx-base)]">
        {t("dashboard.title")} — {org?.name}
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className="group transition-shadow hover:shadow-[var(--shadow-md)]">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--tx-muted)]">{k.label}</p>
            <p className="mt-2 text-3xl font-bold text-[var(--tx-base)]">{k.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-sm font-semibold text-[var(--tx-base)]">{t("dashboard.completedTasks")}</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--tx-muted)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "var(--tx-muted)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 12,
                }}
              />
              <Line type="monotone" dataKey="tasks" stroke="var(--a-500)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="mb-4 text-sm font-semibold text-[var(--tx-base)]">{t("dashboard.taskDistribution")}</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h2 className="mb-4 text-sm font-semibold text-[var(--tx-base)]">{t("dashboard.recentActivity")}</h2>
        <ul className="divide-y divide-[var(--border)]">
          {(activity.data ?? []).map((a) => (
            <li key={a.id} className="flex items-center justify-between py-3">
              <span className="text-sm text-[var(--tx-base)]">{a.text}</span>
              <span className="text-xs text-[var(--tx-faint)]">
                {new Date(a.at).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
