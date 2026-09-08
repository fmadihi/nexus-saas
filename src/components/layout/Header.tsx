// import { useEffect, useState } from "react";
// import { Menu, Moon, Sun, Building2 } from "lucide-react";
// import { api } from "../../lib/api";
// import type { Org } from "../../types";
// import { useAuth } from "../../context/AuthContext";

// export default function Header({ onMenu }: { onMenu: () => void }) {
//   const { user, org, logout } = useAuth();
//   const [dark, setDark] = useState(
//     () => localStorage.getItem("theme") === "dark",
//   );
//   const [orgs, setOrgs] = useState<Org[]>([]);

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", dark);
//     localStorage.setItem("theme", dark ? "dark" : "light");
//   }, [dark]);

//   useEffect(() => {
//     api<Org[]>("/orgs")
//       .then(setOrgs)
//       .catch(() => {});
//   }, []);

//   return (
//     <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
//       <div className="flex items-center gap-3">
//         <button className="md:hidden" onClick={onMenu}>
//           <Menu className="h-5 w-5" />
//         </button>
//         <select
//           value={org?.id ?? ""}
//           onChange={async (e) => {
//             const selected = orgs.find((o) => o.id === e.target.value);
//             if (selected) {
//               localStorage.setItem("org", JSON.stringify(selected));
//               window.location.reload();
//             }
//           }}
//           className="rounded-lg border border-slate-300 bg-transparent px-2 py-1.5 text-sm dark:border-slate-700"
//         >
//           {orgs.map((o) => (
//             <option key={o.id} value={o.id}>
//               {o.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="flex items-center gap-3">
//         <button onClick={() => setDark((d) => !d)} aria-label="تم">
//           {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//         </button>
//         <span className="hidden text-sm sm:block">
//           {user?.name} · {user?.role}
//         </span>
//       </div>
//     </header>
//   );
// }

import { useEffect, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { api } from "../../lib/api";
import type { Org } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "fa", label: "فا" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

export default function Header({ onMenu }: { onMenu: () => void }) {
  const { user, org, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [orgs, setOrgs] = useState<Org[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    api<Org[]>("/orgs").then(setOrgs).catch(() => {});
  }, []);

  const changeLang = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    document.documentElement.dir = code === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = code;
  };

  return (
    <header className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-raised)] px-4 py-3 shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-2">
        <button
          className="rounded-[var(--r-md)] p-2 text-[var(--tx-muted)] hover:bg-[var(--bg-subtle)] md:hidden transition-colors"
          onClick={onMenu}
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <select
          value={org?.id ?? ""}
          onChange={async (e) => {
            const selected = orgs.find((o) => o.id === e.target.value);
            if (selected) {
              localStorage.setItem("org", JSON.stringify(selected));
              window.location.reload();
            }
          }}
          className="rounded-[var(--r-md)] border border-[var(--border)] bg-transparent px-3 py-1.5 text-sm text-[var(--tx-base)] focus:outline-none focus:ring-2 focus:ring-[var(--a-500)]/40"
        >
          {orgs.map((o) => (
            <option key={o.id} value={o.id}>{o.name}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        {/* Language switcher */}
        <div className="flex rounded-[var(--r-md)] border border-[var(--border)] overflow-hidden">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => changeLang(l.code)}
              className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                i18n.language === l.code
                  ? "bg-[var(--a-500)] text-white"
                  : "text-[var(--tx-muted)] hover:bg-[var(--bg-subtle)]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Dark mode */}
        <button
          onClick={() => setDark((d) => !d)}
          aria-label={t("common.theme")}
          className="rounded-[var(--r-md)] p-2 text-[var(--tx-muted)] hover:bg-[var(--bg-subtle)] transition-colors"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* User info */}
        <div className="hidden items-center gap-2 sm:flex">
          <div className="h-7 w-7 rounded-full bg-[var(--a-500)] flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <span className="text-sm text-[var(--tx-muted)]">{user?.name}</span>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          aria-label={t("common.logout")}
          className="rounded-[var(--r-md)] px-3 py-1.5 text-xs text-[var(--tx-muted)] hover:bg-[var(--bg-subtle)] transition-colors"
        >
          {t("common.logout")}
        </button>
      </div>
    </header>
  );
}

