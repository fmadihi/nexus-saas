// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// export default function Layout() {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="flex min-h-screen">
//       <Sidebar open={open} onClose={() => setOpen(false)} />
//       <div className="flex flex-1 flex-col">
//         <Header onMenu={() => setOpen((o) => !o)} />
//         <main className="flex-1 p-4 md:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
// src/components/layout/Layout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div
        className={[
          "flex flex-1 flex-col min-w-0",
          isRTL ? "md:mr-64" : "md:ml-64",
        ].join(" ")}
      >
        <Header onMenu={() => setOpen((o) => !o)} />
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
