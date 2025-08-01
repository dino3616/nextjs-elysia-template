'use client'

import { useState } from 'react'
import Image from "next/image"
import { api } from '@/lib/api'

interface ApiResponse {
  message?: string
  status?: string
  timestamp?: string
  uptime?: number
  echo?: unknown
  error?: string
}

export default function Home() {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const testHello = async () => {
    setLoading(true)
    try {
      const { data, error } = await api.api.hello.get()
      if (error) {
        setApiResponse({ error: 'API call failed' })
      } else {
        setApiResponse(data)
      }
    } catch (error) {
      console.error('API call failed:', error)
      setApiResponse({ error: 'API call failed' })
    } finally {
      setLoading(false)
    }
  }

  const testHealth = async () => {
    setLoading(true)
    try {
      const { data, error } = await api.api.health.get()
      if (error) {
        setApiResponse({ error: 'API call failed' })
      } else {
        setApiResponse(data)
      }
    } catch (error) {
      console.error('API call failed:', error)
      setApiResponse({ error: 'API call failed' })
    } finally {
      setLoading(false)
    }
  }

  const testEcho = async () => {
    setLoading(true)
    try {
      const { data, error } = await api.api.echo.post({
        message: 'Hello Elysia!'
      })
      if (error) {
        setApiResponse({ error: 'API call failed' })
      } else {
        setApiResponse(data)
      }
    } catch (error) {
      console.error('API call failed:', error)
      setApiResponse({ error: 'API call failed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <span className="text-2xl font-bold">+</span>
          <div className="text-2xl font-bold text-blue-600">Elysia.js</div>
        </div>

        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold mb-4">Next.js + Elysia.js Template</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            A modern API template combining Next.js App Router with Elysia.js
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-6">
            Now with Eden Treaty for type-safe API calls!
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-md">
          <h2 className="text-xl font-semibold">Test API Endpoints</h2>
          
          <div className="flex flex-col gap-2">
            <button
              onClick={testHello}
              disabled={loading}
              className="rounded border border-solid border-gray-300 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm h-10 px-4"
            >
              Test /api/hello (Eden Treaty)
            </button>
            
            <button
              onClick={testHealth}
              disabled={loading}
              className="rounded border border-solid border-gray-300 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm h-10 px-4"
            >
              Test /api/health (Eden Treaty)
            </button>
            
            <button
              onClick={testEcho}
              disabled={loading}
              className="rounded border border-solid border-gray-300 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm h-10 px-4"
            >
              Test /api/echo (Eden Treaty POST)
            </button>
          </div>

          {loading && (
            <div className="text-center text-gray-500">Loading...</div>
          )}

          {apiResponse && (
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">API Response:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/api/swagger"
            target="_blank"
            rel="noopener noreferrer"
          >
            📖 View API Docs
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="https://elysiajs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Elysia.js Docs
          </a>
        </div>
      </main>
    </div>
  )
}
