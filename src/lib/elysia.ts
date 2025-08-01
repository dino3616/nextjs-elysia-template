import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'

const app = new Elysia({ prefix: '/api' })
  .use(swagger({
    documentation: {
      info: {
        title: 'Next.js + Elysia.js API',
        version: '1.0.0',
        description: 'API documentation for Next.js with Elysia.js'
      }
    }
  }))
  .onError(({ code, error }) => {
    if (code === 'NOT_FOUND') {
      return { error: 'Route not found' }
    }
    
    return { 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  })
  .get('/hello', () => ({ 
    message: 'Hello from Elysia.js!',
    timestamp: new Date().toISOString()
  }))
  .get('/health', () => ({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  }))
  .post('/echo', ({ body }) => ({ 
    echo: body,
    timestamp: new Date().toISOString()
  }), {
    body: t.Object({
      message: t.String()
    })
  })

export type App = typeof app
export const createElysiaApp = () => app