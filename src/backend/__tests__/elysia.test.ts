import { describe, it, expect, beforeEach } from 'vitest'
import { createElysiaApp } from '../../lib/elysia'

describe('Example CRUD API', () => {
  let app: ReturnType<typeof createElysiaApp>

  beforeEach(() => {
    app = createElysiaApp()
  })

  describe('GET /api/example', () => {
    it('一覧を正常に取得する', async () => {
      const response = await app.handle(new Request('http://localhost/api/example'))
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBeGreaterThan(0)
      
      // 最初のExampleの構造確認
      const firstExample = data[0]
      expect(firstExample).toHaveProperty('id')
      expect(firstExample).toHaveProperty('title')
      expect(firstExample).toHaveProperty('description')
      expect(firstExample).toHaveProperty('category')
      expect(firstExample).toHaveProperty('isActive')
    })
  })

  describe('GET /api/example/:id', () => {
    it('詳細を正常に取得する', async () => {
      const response = await app.handle(new Request('http://localhost/api/example/example-1'))
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.id).toBe('example-1')
      expect(data.title).toBe('サンプル記事1')
      expect(typeof data.description).toBe('string')
    })

    it('存在しないIDの場合404を返す', async () => {
      const response = await app.handle(new Request('http://localhost/api/example/nonexistent'))
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.code).toBe('EXAMPLE_NOT_FOUND')
    })
  })

  describe('POST /api/example', () => {
    it('新しいExampleを正常に作成する', async () => {
      const newExample = {
        title: 'テスト記事',
        description: 'これはテスト用の記事です。',
        category: 'test',
        isActive: true
      }

      const response = await app.handle(
        new Request('http://localhost/api/example', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newExample)
        })
      )
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.title).toBe(newExample.title)
      expect(data.description).toBe(newExample.description)
      expect(data.category).toBe(newExample.category)
      expect(data.isActive).toBe(newExample.isActive)
      expect(data).toHaveProperty('id')
      expect(data).toHaveProperty('createdAt')
      expect(data).toHaveProperty('updatedAt')
    })

    it('空のオブジェクトでもExampleを作成する', async () => {
      const emptyExample = {}

      const response = await app.handle(
        new Request('http://localhost/api/example', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emptyExample)
        })
      )
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data).toHaveProperty('id')
      expect(data).toHaveProperty('createdAt')
      expect(data).toHaveProperty('updatedAt')
    })
  })

  describe('PUT /api/example/:id', () => {
    it('Exampleを正常に更新する', async () => {
      const updateData = {
        title: '更新されたタイトル',
        isActive: false
      }

      const response = await app.handle(
        new Request('http://localhost/api/example/example-1', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData)
        })
      )
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.title).toBe(updateData.title)
      expect(data.isActive).toBe(updateData.isActive)
      expect(data.id).toBe('example-1')
    })

    it('存在しないIDの場合404を返す', async () => {
      const updateData = { title: '更新されたタイトル' }

      const response = await app.handle(
        new Request('http://localhost/api/example/nonexistent', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData)
        })
      )
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.code).toBe('EXAMPLE_NOT_FOUND')
    })
  })

  describe('DELETE /api/example/:id', () => {
    it('Exampleを正常に削除する', async () => {
      const response = await app.handle(
        new Request('http://localhost/api/example/example-3', {
          method: 'DELETE'
        })
      )
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toBe('Example deleted successfully')

      // 削除されたことを確認
      const getResponse = await app.handle(new Request('http://localhost/api/example/example-3'))
      expect(getResponse.status).toBe(404)
    })

    it('存在しないIDの場合404を返す', async () => {
      const response = await app.handle(
        new Request('http://localhost/api/example/nonexistent', {
          method: 'DELETE'
        })
      )
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.code).toBe('EXAMPLE_NOT_FOUND')
    })
  })

  describe('エラーハンドリング', () => {
    it('存在しないエンドポイントで404を返す', async () => {
      const response = await app.handle(new Request('http://localhost/api/nonexistent'))
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.code).toBe('NOT_FOUND')
    })
  })

})