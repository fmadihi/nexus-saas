import { createContext, useContext, useState, type ReactNode } from "react";
import { api } from "../lib/api";
import type { User, Org } from "../types";

interface AuthState {
  user: User | null;
  org: Org | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    orgName: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState>(null!);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const [org, setOrg] = useState<Org | null>(() => {
    const raw = localStorage.getItem("org");
    return raw ? JSON.parse(raw) : null;
  });

  const persist = (u: User | null, o: Org | null) => {
    setUser(u);
    setOrg(o);
    u
      ? localStorage.setItem("user", JSON.stringify(u))
      : localStorage.removeItem("user");
    o
      ? localStorage.setItem("org", JSON.stringify(o))
      : localStorage.removeItem("org");
  };

  const login = async (email: string, password: string) => {
    const users = await api<User[]>(
      `/users?email=${encodeURIComponent(email)}&password=${password}`,
    );
    if (!users.length) throw new Error("ایمیل یا رمز عبور نادرست است");
    const u = users[0];
    const orgs = await api<Org[]>(`/orgs?id=${u.orgId}`);
    persist(u, orgs[0] ?? null);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    orgName: string,
  ) => {
    const org = await api<Org>("/orgs", {
      method: "POST",
      body: JSON.stringify({ name: orgName, plan: "free" }),
    });
    const u = await api<User>("/users", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        role: "admin",
        orgId: org.id,
        active: true,
        joinedAt: new Date().toISOString(),
      }),
    });
    persist(u, org);
  };

  const logout = () => persist(null, null);
  return (
    <AuthContext.Provider value={{ user, org, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
