

export type Role = 'admin' | 'manager' | 'user';
export type TaskStatus = 'todo' | 'inprogress' | 'review' | 'done';

export interface User { id: string; email: string; password: string; name: string; role: Role; orgId: string; active: boolean; joinedAt: string; }
export interface Org { id: string; name: string; plan: 'free' | 'pro' | 'enterprise'; }
export interface Project { id: string; orgId: string; name: string; status: string; budget: number; progress: number; }
export interface Task { id: string; orgId: string; projectId: string; title: string; status: TaskStatus; assigneeId: string; tags: string[]; }
export interface Invoice { id: string; orgId: string; amount: number; status: string; date: string; }
export interface Activity { id: string; orgId: string; text: string; at: string; }
