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

export interface ExampleResponse {
  id: string
  title: string
  description: string
  category: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}


export interface ApiError {
  error: string
  code: string
  timestamp: string
  path: string
  message?: string
}