// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { AuthProvider } from "./context/AuthContext";
// import App from "./App";

// const queryClient = new QueryClient();

// async function prepare() {
//   if (import.meta.env.DEV) {
//     const { worker } = await import("./mocks/browser");
//     return worker.start({ onUnhandledRequest: "bypass" });
//   }
// }

// prepare().then(() => {
//   createRoot(document.getElementById("root")!).render(
//     <StrictMode>
//       <QueryClientProvider client={queryClient}>
//         <BrowserRouter>
//           <AuthProvider>
//             <App />
//           </AuthProvider>
//         </BrowserRouter>
//       </QueryClientProvider>
//     </StrictMode>,
//   );
// });
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

// const queryClient = new QueryClient();
// توی QueryClient default تنظیم کن (main.tsx یا App.tsx)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 50_000, // 1 دقیقه
      gcTime: 5 * 60_000, // 5 دقیقه در memory نگه داره
      retry: 1,
    },
  },
});

async function prepare() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    return worker.start({ onUnhandledRequest: "bypass" });
  }
}

prepare().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>,
  );
});
