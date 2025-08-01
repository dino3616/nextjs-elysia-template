'use client'

import { useState, useEffect } from 'react'
import { exampleAPI, Example, CreateExampleRequest } from '@/lib/api-client'

export default function ExamplesPage() {
  const [examples, setExamples] = useState<Example[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<CreateExampleRequest>({
    title: '',
    description: '',
    category: 'general',
    isActive: true
  })

  const fetchExamples = async () => {
    setLoading(true)
    try {
      const data = await exampleAPI.getAll()
      setExamples(data)
      setError('')
    } catch (err) {
      setError('データの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title?.trim()) return

    try {
      await exampleAPI.create(formData)
      setFormData({ title: '', description: '', category: 'general', isActive: true })
      fetchExamples()
      setError('')
    } catch (err) {
      setError('作成に失敗しました')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('本当に削除しますか？')) return

    try {
      await exampleAPI.delete(id)
      fetchExamples()
      setError('')
    } catch (err) {
      setError('削除に失敗しました')
    }
  }

  const toggleActive = async (example: Example) => {
    try {
      await exampleAPI.update(example.id, { isActive: !example.isActive })
      fetchExamples()
      setError('')
    } catch (err) {
      setError('更新に失敗しました')
    }
  }

  useEffect(() => {
    fetchExamples()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Example管理</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* 作成フォーム */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">新規作成</h2>
        <form onSubmit={handleCreate} className="grid gap-4">
          <input
            type="text"
            placeholder="タイトル"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="border rounded px-3 py-2"
            required
          />
          
          <textarea
            placeholder="説明"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="border rounded px-3 py-2 h-24"
          />
          
          <select
            value={formData.category || 'general'}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="border rounded px-3 py-2"
          >
            <option value="general">一般</option>
            <option value="tutorial">チュートリアル</option>
            <option value="guide">ガイド</option>
            <option value="news">ニュース</option>
          </select>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive ?? true}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="mr-2"
            />
            アクティブ
          </label>
          
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            作成
          </button>
        </form>
      </div>

      {/* Examples一覧 */}
      <div className="grid gap-4">
        {examples.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            まだExampleがありません
          </div>
        ) : (
          examples.map((example) => (
            <div key={example.id} className="border rounded-lg p-4 shadow-sm bg-white">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">{example.title}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleActive(example)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      example.isActive 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {example.isActive ? 'アクティブ' : '非アクティブ'}
                  </button>
                  <button
                    onClick={() => handleDelete(example.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    削除
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 mb-3">{example.description}</p>
              
              <div className="text-sm text-gray-500 flex space-x-4">
                <span>カテゴリ: {example.category}</span>
                <span>作成日: {new Date(example.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={fetchExamples}
        className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
      >
        再読み込み
      </button>
    </div>
  )
}