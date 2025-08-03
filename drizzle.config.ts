import type { Config } from 'drizzle-kit';

const config = {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL || '',
  },
} satisfies Config;

export default config;
