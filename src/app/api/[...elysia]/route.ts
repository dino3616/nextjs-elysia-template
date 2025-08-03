import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia, t } from 'elysia';
import { db } from '@/db';
import { type NewUser, users } from '@/db/schema';

const app = new Elysia({ prefix: '/api' })
  .use(cors())
  .use(swagger())
  .get('/health', () => ({ status: 'ok' }))
  .get('/users', async () => {
    const allUsers = await db.select().from(users);
    return { users: allUsers };
  })
  .post(
    '/users',
    async ({ body }) => {
      const newUser = await db
        .insert(users)
        .values(body as NewUser)
        .returning();
      return { user: newUser[0] };
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
      }),
    },
  );

export const GET = app.handle;
export const POST = app.handle;
