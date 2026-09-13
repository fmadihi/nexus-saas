import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import i18n from "./i18n";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Forbidden from "./pages/login/Forbidden";
import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/dashboard/Projects";
import Tasks from "./pages/dashboard/Tasks";
import Members from "./pages/access/Members";
import Billing from "./pages/access/Billing";
import Settings from "./pages/access/Settings";

export default function App() {
  useEffect(() => {
    const lang = localStorage.getItem("lang") ?? "fa";
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/403" element={<Forbidden />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
            
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/members"
            element={
              <ProtectedRoute roles={["admin", "manager"]}>
                <Members />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Billing />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
