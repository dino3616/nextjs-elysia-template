import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { ExampleController } from '../backend/controllers'

const app = new Elysia({ prefix: '/api' })
  .use(swagger({
    documentation: {
      info: {
        title: 'Example CRUD API',
        version: '1.0.0',
        description: 'シンプルなCRUD操作のサンプルAPI'
      },
      tags: [
        { name: 'Example', description: 'サンプルCRUD操作のAPI' }
      ]
    }
  }))
  .onError(({ code, error, set }) => {
    if (code === 'NOT_FOUND') {
      set.status = 404
      return { 
        error: 'Route not found',
        code: 'NOT_FOUND',
        timestamp: new Date().toISOString(),
        path: ''
      }
    }
    
    set.status = 500
    return { 
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
      timestamp: new Date().toISOString(),
      path: '',
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  })
  .get('/example', ExampleController.getAll, {
    detail: {
      summary: 'Example一覧取得',
      description: 'Exampleの一覧をページネーション付きで取得します',
      tags: ['Example']
    }
  })
  .get('/example/:id', ExampleController.getById, {
    detail: {
      summary: 'Example詳細取得',
      description: '指定されたIDのExampleを取得します',
      tags: ['Example']
    }
  })
  .post('/example', ExampleController.create, {
    detail: {
      summary: 'Example作成',
      description: '新しいExampleを作成します',
      tags: ['Example']
    }
  })
  .put('/example/:id', ExampleController.update, {
    detail: {
      summary: 'Example更新',
      description: '指定されたIDのExampleを更新します',
      tags: ['Example']
    }
  })
  .delete('/example/:id', ExampleController.delete, {
    detail: {
      summary: 'Example削除',
      description: '指定されたIDのExampleを削除します',
      tags: ['Example']
    }
  })

export type App = typeof app
export const createElysiaApp = () => app