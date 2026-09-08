// // import { NavLink } from "react-router-dom";
// // import {
// //   LayoutDashboard,
// //   FolderKanban,
// //   ListChecks,
// //   Users,
// //   Receipt,
// //   Settings,
// //   X,
// // } from "lucide-react";
// // import { useAuth } from "../../context/AuthContext";
// // import type { Role } from "../../types";

// // const links: { to: string; label: string; icon: any; roles?: Role[] }[] = [
// //   { to: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
// //   { to: "/projects", label: "پروژه‌ها", icon: FolderKanban },
// //   { to: "/tasks", label: "تسک‌ها", icon: ListChecks },
// //   { to: "/members", label: "اعضا", icon: Users, roles: ["admin", "manager"] },
// //   { to: "/billing", label: "فاکتورها", icon: Receipt, roles: ["admin"] },
// //   { to: "/settings", label: "تنظیمات", icon: Settings },
// // ];

// // export default function Sidebar({
// //   open,
// //   onClose,
// // }: {
// //   open: boolean;
// //   onClose: () => void;
// // }) {
// //   const { user, org, logout } = useAuth();
// //   return (
// //     <>
// //       {open && (
// //         <div
// //           className="fixed inset-0 bg-black/40 z-40 md:hidden"
// //           onClick={onClose}
// //         />
// //       )}
// //       <aside
// //         className={`fixed md:static z-50 h-full w-64 shrink-0 border-l border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 transition-transform ${open ? "translate-x-0" : "translate-x-full md:translate-x-0"} md:translate-x-0`}
// //       >
// //         <div className="mb-6 flex items-center justify-between">
// //           <div className="font-bold text-lg">⚡ {org?.name ?? "Nexus"}</div>
// //           <button className="md:hidden" onClick={onClose}>
// //             <X className="h-5 w-5" />
// //           </button>
// //         </div>
// //         <nav className="space-y-1">
// //           {links
// //             .filter((l) => !l.roles || (user && l.roles.includes(user.role)))
// //             .map((l) => (
// //               <NavLink
// //                 key={l.to}
// //                 to={l.to}
// //                 onClick={onClose}
// //                 className={({ isActive }) =>
// //                   `flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`
// //                 }
// //               >
// //                 <l.icon className="h-4 w-4" /> {l.label}
// //               </NavLink>
// //             ))}
// //         </nav>
// //         <button
// //           onClick={logout}
// //           className="mt-8 w-full rounded-lg border border-slate-300 py-2 text-sm dark:border-slate-700"
// //         >
// //           خروج از حساب
// //         </button>
// //       </aside>
// //     </>
// //   );
// // }
// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard, FolderKanban, ListChecks,
//   Users, Receipt, Settings, X,
// } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";
// import { useTranslation } from "react-i18next";
// import type { Role } from "../../types";

// export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
//   const { user, org, logout } = useAuth();
//   const { t } = useTranslation();

//   const links = [
//     { to: "/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
//     { to: "/projects",  label: t("nav.projects"),  icon: FolderKanban },
//     { to: "/tasks",     label: t("nav.tasks"),      icon: ListChecks },
//     { to: "/members",   label: t("nav.members"),    icon: Users,    roles: ["admin", "manager"] as Role[] },
//     { to: "/billing",   label: t("nav.billing"),    icon: Receipt,  roles: ["admin"] as Role[] },
//     { to: "/settings",  label: t("nav.settings"),   icon: Settings },
//   ];

//   return (
//     <>
//       {open && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={onClose} />
//       )}
//        {/* <aside
//         className={`fixed md:static z-50 h-full w-64 shrink-0 flex flex-col
//           border-e border-[var(--border)] bg-[var(--bg-raised)]
//           transition-transform duration-200 ease-[var(--ease)]
//           ltr:left-0 rtl:right-0
//           ${open ? "translate-x-0 " : "translate-x-full rtl:-translate-x-full md:translate-x-0"}`}
//       >  */}
//      <aside
//   className={`fixed md:static z-50 h-full w-64 shrink-0 flex flex-col
//     border-e border-[var(--border)] bg-[var(--bg-raised)]
//     transition-transform duration-200 ease-[var(--ease)]
//     ltr:left-0 rtl:right-0
//     ${open
//       ? "translate-x-0"
//       : " rtl:translate-x-full md:translate-x-0"
//     }`}
// >

//       {/* <aside
//   className={`fixed md:static z-50 h-full w-64 shrink-0 flex flex-col
//     border-e border-[var(--border)] bg-[var(--bg-raised)]
//     transition-transform duration-200 ease-[var(--ease)]
//     ltr:left-0 rtl:right-0
//     ${open
//       ? "translate-x-0"
//       : "ltr:translate-x-full rtl:translate-x-full md:translate-x-0"
//     }`}
// > */}

//         {/* Logo */}
//         <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
//           <div className="flex items-center gap-2">
//             <div className="h-7 w-7 rounded-[var(--r-sm)] bg-[var(--a-500)] flex items-center justify-center">
//               <span className="text-white text-xs font-bold">N</span>
//             </div>
//             <span className="font-semibold text-[var(--tx-base)]">{org?.name ?? "Nexus"}</span>
//           </div>
//           <button className="md:hidden p-1 rounded-[var(--r-sm)] text-[var(--tx-muted)] hover:bg-[var(--bg-subtle)]" onClick={onClose}>
//             <X className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
//           {links
//             .filter((l) => !l.roles || (user && l.roles.includes(user.role)))
//             .map((l) => (
//               <NavLink
//                 key={l.to}
//                 to={l.to}
//                 onClick={onClose}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 rounded-[var(--r-md)] px-3 py-2.5 text-sm font-medium transition-colors duration-[var(--dur)]
//                   ${isActive
//                     ? "bg-[var(--a-500)] text-white shadow-[var(--shadow-sm)]"
//                     : "text-[var(--tx-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--tx-base)]"
//                   }`
//                 }
//               >
//                 <l.icon className="h-4 w-4 shrink-0" />
//                 {l.label}
//               </NavLink>
//             ))}
//         </nav>

//         {/* Footer */}
//         <div className="border-t border-[var(--border)] p-3">
//           <button
//             onClick={logout}
//             className="w-full flex items-center gap-3 rounded-[var(--r-md)] px-3 py-2.5 text-sm font-medium text-[var(--tx-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--danger)] transition-colors"
//           >
//             {t("common.logout")}
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }
// src/components/layout/Sidebar.tsx

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, FolderKanban, ListChecks,
  Users, Receipt, Settings, X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import type { Role } from "../../types";

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, org, logout } = useAuth();
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "fa";
  const anchor = isRTL ? "right-0" : "left-0";
  const hiddenTranslate = isRTL ? "translate-x-full" : "-translate-x-full";

  const links = [
    { to: "/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
    { to: "/projects",  label: t("nav.projects"),  icon: FolderKanban },
    { to: "/tasks",     label: t("nav.tasks"),      icon: ListChecks },
    { to: "/members",   label: t("nav.members"),    icon: Users,   roles: ["admin", "manager"] as Role[] },
    { to: "/billing",   label: t("nav.billing"),    icon: Receipt, roles: ["admin"] as Role[] },
    { to: "/settings",  label: t("nav.settings"),   icon: Settings },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          "fixed top-0 z-50 h-screen w-64 shrink-0 flex flex-col",
          "border-e border-[var(--border)] bg-[var(--bg-raised)]",
          "transition-transform duration-200 ease-[var(--ease)]",
          anchor,
          open ? "translate-x-0" : `${hiddenTranslate} md:translate-x-0`,
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-[var(--r-sm)] bg-[var(--a-500)] flex items-center justify-center">
              <span className="text-white text-xs font-bold">N</span>
            </div>
            <span className="font-semibold text-[var(--tx-base)]">{org?.name ?? "Nexus"}</span>
          </div>
          <button
            className="md:hidden p-1 rounded-[var(--r-sm)] text-[var(--tx-muted)] hover:bg-[var(--bg-subtle)]"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {links
            .filter((l) => !l.roles || (user && l.roles.includes(user.role)))
            .map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-[var(--r-md)] px-3 py-2.5 text-sm font-medium",
                    "transition-colors duration-[var(--dur)]",
                    isActive
                      ? "bg-[var(--a-500)] text-white shadow-[var(--shadow-sm)]"
                      : "text-[var(--tx-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--tx-base)]",
                  ].join(" ")
                }
              >
                <l.icon className="h-4 w-4 shrink-0" />
                {l.label}
              </NavLink>
            ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-[var(--border)] p-3">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 rounded-[var(--r-md)] px-3 py-2.5 text-sm font-medium text-[var(--tx-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--danger)] transition-colors"
          >
            {t("common.logout")}
          </button>
        </div>
      </aside>
    </>
  );
}
