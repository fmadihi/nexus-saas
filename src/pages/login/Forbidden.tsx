// import { Link } from "react-router-dom";
// import { ShieldAlert } from "lucide-react";

// export default function Forbidden() {
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
//       <ShieldAlert className="h-16 w-16 text-red-500" />
//       <h1 className="text-3xl font-bold">403 — دسترسی مجاز نیست</h1>
//       <p className="text-slate-500">
//         شما اجازه دیدن این بخش را ندارید؛ با مدیر سازمان تماس بگیرید.
//       </p>
//       <Link
//         to="/dashboard"
//         className="rounded-lg bg-blue-600 px-5 py-2 text-white"
//       >
//         بازگشت به داشبورد
//       </Link>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Forbidden() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--bg)] p-4 text-center">
      <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-5">
        <ShieldAlert classNk
        to="/dashboard text-[var(--danger)]" />
      </div>
      <h1 className="text-2xl font-bold text-[var(--tx-base)]">{t("forbidden.title")}</h1>
      <p className="max-w-xs text-sm text-[var(--tx-muted)]">{t("forbidden.desc")}</p>
      <Link
        to="/dashboard"
        className="rounded-[var(--r-md)] bg-[var(--a-500)] px-5 py-2 text-sm font-medium text-white hover:bg-[var(--a-600)] transition-colors"
      >
        {t("forbidden.back")}
      </Link>
    </div>
  );
}
