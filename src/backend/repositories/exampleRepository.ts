import { Example, CreateExampleRequest, UpdateExampleRequest } from '../types/example'

export interface IExampleRepository {
  findAll(filters?: { category?: string; isActive?: boolean }): Example[]
  findById(id: string): Example | null
  create(data: CreateExampleRequest): Example
  update(id: string, data: UpdateExampleRequest): Example | null
  delete(id: string): boolean
}

export class ExampleRepository implements IExampleRepository {
  private examples: Example[] = [
    {
      id: 'example-1',
      title: 'サンプル記事1',
      description: 'これは最初のサンプル記事です。',
      category: 'tutorial',
      isActive: true,
      createdAt: '2024-01-01T10:00:00.000Z',
      updatedAt: '2024-01-01T10:00:00.000Z'
    },
    {
      id: 'example-2',
      title: 'サンプル記事2',
      description: 'これは2番目のサンプル記事です。',
      category: 'guide',
      isActive: true,
      createdAt: '2024-01-01T11:00:00.000Z',
      updatedAt: '2024-01-01T11:00:00.000Z'
    },
    {
      id: 'example-3',
      title: 'サンプル記事3',
      description: 'これは3番目のサンプル記事です。',
      category: 'tutorial',
      isActive: false,
      createdAt: '2024-01-01T12:00:00.000Z',
      updatedAt: '2024-01-01T12:00:00.000Z'
    }
  ]

  private generateId(): string {
    return `example-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
  }

  findAll(filters?: { category?: string; isActive?: boolean }): Example[] {
    let filteredExamples = [...this.examples]

    if (filters?.category) {
      filteredExamples = filteredExamples.filter(example => example.category === filters.category)
    }
    if (filters?.isActive !== undefined) {
      filteredExamples = filteredExamples.filter(example => example.isActive === filters.isActive)
    }

    return filteredExamples
  }

  findById(id: string): Example | null {
    return this.examples.find(example => example.id === id) || null
  }

  create(data: CreateExampleRequest): Example {
    const now = new Date().toISOString()
    const newExample: Example = {
      id: this.generateId(),
      title: data.title || 'Untitled',
      description: data.description || 'No description provided',
      category: data.category || 'general',
      isActive: data.isActive ?? true,
      createdAt: now,
      updatedAt: now
    }

    this.examples.push(newExample)
    return newExample
  }

  update(id: string, data: UpdateExampleRequest): Example | null {
    const exampleIndex = this.examples.findIndex(example => example.id === id)
    
    if (exampleIndex === -1) {
      return null
    }

    const existingExample = this.examples[exampleIndex]
    const updatedExample: Example = {
      ...existingExample,
      title: data.title ?? existingExample.title,
      description: data.description ?? existingExample.description,
      category: data.category ?? existingExample.category,
      isActive: data.isActive ?? existingExample.isActive,
      updatedAt: new Date().toISOString()
    }

    this.examples[exampleIndex] = updatedExample
    return updatedExample
  }

  delete(id: string): boolean {
    const exampleIndex = this.examples.findIndex(example => example.id === id)
    
    if (exampleIndex === -1) {
      return false
    }

    this.examples.splice(exampleIndex, 1)
    return true
  }
}

export const exampleRepository = new ExampleRepository()
