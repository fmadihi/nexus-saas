// import { useEffect, useState } from "react";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";
// import Input from "../../components/ui/Input";

// export default function Settings() {
//   const [dark, setDark] = useState(
//     () => localStorage.getItem("theme") === "dark",
//   );
//   const [name, setName] = useState(
//     localStorage.getItem("user")
//       ? JSON.parse(localStorage.getItem("user")!).name
//       : "",
//   );

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", dark);
//     localStorage.setItem("theme", dark ? "dark" : "light");
//   }, [dark]);

//   return (
//     <div className="max-w-xl space-y-4">
//       <h1 className="text-2xl font-bold">تنظیمات</h1>
//       <Card className="flex items-center justify-between">
//         <span>حالت تاریک</span>
//         <button
//           onClick={() => setDark((d) => !d)}
//           className={`h-6 w-11 rounded-full transition ${dark ? "bg-blue-600" : "bg-slate-300"}`}
//         >
//           <span
//             className={`block h-5 w-5 rounded-full bg-white transition ${dark ? "translate-x-5" : ""}`}
//           />
//         </button>
//       </Card>
//       <Card className="space-y-3">
//         <h2 className="font-semibold">پروفایل</h2>
//         <Input
//           label="نام"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <Button
//           onClick={() => {
//             const u = JSON.parse(localStorage.getItem("user")!);
//             u.name = name;
//             localStorage.setItem("user", JSON.stringify(u));
//             window.location.reload();
//           }}
//         >
//           ذخیره
//         </Button>
//       </Card>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "fa", label: "فارسی" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
];

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [name, setName] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).name : ""
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const changeLang = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    document.documentElement.dir = code === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = code;
  };

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold text-[var(--tx-base)]">{t("settings.title")}</h1>

      {/* Dark mode */}
      <Card className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--tx-base)]">{t("settings.darkMode")}</span>
        <button
          onClick={() => setDark((d) => !d)}
          role="switch"
          aria-checked={dark}
          className={`relative h-6 w-11 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--a-500)] ${
            dark ? "bg-[var(--a-500)]" : "bg-[var(--n-300)]"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
              dark ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </Card>

      {/* Language */}
      <Card className="space-y-3">
        <h2 className="font-semibold text-[var(--tx-base)]">{t("settings.language")}</h2>
        <div className="flex gap-2">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => changeLang(l.code)}
              className={`rounded-[var(--r-md)] border px-4 py-1.5 text-sm font-medium transition-colors ${
                i18n.language === l.code
                  ? "border-[var(--a-500)] bg-[var(--a-100)] text-[var(--a-700)] dark:bg-[var(--a-700)]/30 dark:text-[var(--a-300)]"
                  : "border-[var(--border)] text-[var(--tx-muted)] hover:bg-[var(--bg-subtle)]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Profile */}
      <Card className="space-y-4">
        <h2 className="font-semibold text-[var(--tx-base)]">{t("settings.profile")}</h2>
        <Input
          label={t("settings.nameLabel")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          onClick={() => {
            const u = JSON.parse(localStorage.getItem("user")!);
            u.name = name;
            localStorage.setItem("user", JSON.stringify(u));
            window.location.reload();
          }}
        >
          {t("common.save")}
        </Button>
      </Card>
    </div>
  );
}
