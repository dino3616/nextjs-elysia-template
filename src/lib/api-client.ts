// API client for Example CRUD operations
export interface Example {
  id: string
  title: string
  description: string
  category: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateExampleRequest {
  title?: string
  description?: string
  category?: string
  isActive?: boolean
}

export interface UpdateExampleRequest {
  title?: string
  description?: string
  category?: string
  isActive?: boolean
}


export class ExampleAPI {
  private base = '/api'

  async getAll(): Promise<Example[]> {
    const res = await fetch(`${this.base}/example`)
    if (!res.ok) throw new Error('Failed to fetch examples')
    return res.json()
  }

  async getById(id: string): Promise<Example> {
    const res = await fetch(`${this.base}/example/${id}`)
    if (!res.ok) throw new Error(`Example not found: ${id}`)
    return res.json()
  }

  async create(data: CreateExampleRequest): Promise<Example> {
    const res = await fetch(`${this.base}/example`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to create example')
    }
    
    return res.json()
  }

  async update(id: string, data: UpdateExampleRequest): Promise<Example> {
    const res = await fetch(`${this.base}/example/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to update example')
    }
    
    return res.json()
  }

  async delete(id: string): Promise<void> {
    const res = await fetch(`${this.base}/example/${id}`, {
      method: 'DELETE'
    })
    
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to delete example')
    }
  }
}

export const exampleAPI = new ExampleAPI()