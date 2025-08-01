import { treaty } from '@elysiajs/eden'
import type { App } from './elysia'

export const api = treaty<App>('localhost:3000')