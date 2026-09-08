import { http, HttpResponse } from 'msw';
import db from '../../db.json';

export const handlers = [
  http.get('/users', ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    const password = url.searchParams.get('password');
    const id = url.searchParams.get('id');

    let users = db.users as typeof db.users;

    if (email && password) {
      users = users.filter(u => u.email === email && u.password === password);
    } else if (id) {
      users = users.filter(u => u.id === id);
    }

    return HttpResponse.json(users);
  }),

  http.get('/orgs', ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const orgs = id
      ? db.orgs.filter(o => o.id === id)
      : db.orgs;
    return HttpResponse.json(orgs);
  }),

  http.post('/orgs', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    const newOrg = { id: `o${Date.now()}`, ...body };
    return HttpResponse.json(newOrg, { status: 201 });
  }),

  http.post('/users', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    const newUser = { id: `u${Date.now()}`, active: true, joinedAt: new Date().toISOString(), ...body };
    return HttpResponse.json(newUser, { status: 201 });
  }),
];
