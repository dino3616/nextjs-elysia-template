#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const entityName = process.argv[2]
if (!entityName) {
  console.error('Usage: npm run generate-api <EntityName>')
  console.error('Example: npm run generate-api User')
  process.exit(1)
}

const entityLower = entityName.toLowerCase()
const entityPlural = entityLower + 's'

// Templates
const typeTemplate = `export interface ${entityName} {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Create${entityName}Request {
  name?: string
}

export interface Update${entityName}Request {
  name?: string
}

export interface ApiError {
  error: string
  code: string
  timestamp: string
  path: string
}
`

const repositoryTemplate = `import { ${entityName}, Create${entityName}Request, Update${entityName}Request } from '../types/${entityLower}'

export interface I${entityName}Repository {
  findAll(): ${entityName}[]
  findById(id: string): ${entityName} | null
  create(data: Create${entityName}Request): ${entityName}
  update(id: string, data: Update${entityName}Request): ${entityName} | null
  delete(id: string): boolean
}

export class ${entityName}Repository implements I${entityName}Repository {
  private items: ${entityName}[] = [
    {
      id: '${entityLower}-1',
      name: 'Sample ${entityName} 1',
      createdAt: '2024-01-01T10:00:00.000Z',
      updatedAt: '2024-01-01T10:00:00.000Z'
    },
    {
      id: '${entityLower}-2',
      name: 'Sample ${entityName} 2',
      createdAt: '2024-01-01T11:00:00.000Z',
      updatedAt: '2024-01-01T11:00:00.000Z'
    }
  ]

  private generateId(): string {
    return \`${entityLower}-\${Date.now()}-\${Math.random().toString(36).substring(2, 11)}\`
  }

  findAll(): ${entityName}[] {
    return [...this.items]
  }

  findById(id: string): ${entityName} | null {
    return this.items.find(item => item.id === id) || null
  }

  create(data: Create${entityName}Request): ${entityName} {
    const now = new Date().toISOString()
    const newItem: ${entityName} = {
      id: this.generateId(),
      name: data.name || 'Untitled',
      createdAt: now,
      updatedAt: now
    }

    this.items.push(newItem)
    return newItem
  }

  update(id: string, data: Update${entityName}Request): ${entityName} | null {
    const itemIndex = this.items.findIndex(item => item.id === id)
    
    if (itemIndex === -1) {
      return null
    }

    const existingItem = this.items[itemIndex]
    const updatedItem: ${entityName} = {
      ...existingItem,
      name: data.name ?? existingItem.name,
      updatedAt: new Date().toISOString()
    }

    this.items[itemIndex] = updatedItem
    return updatedItem
  }

  delete(id: string): boolean {
    const itemIndex = this.items.findIndex(item => item.id === id)
    
    if (itemIndex === -1) {
      return false
    }

    this.items.splice(itemIndex, 1)
    return true
  }
}

export const ${entityLower}Repository = new ${entityName}Repository()
`

const serviceTemplate = `import { ${entityName}, Create${entityName}Request, Update${entityName}Request } from '../types/${entityLower}'
import { ${entityLower}Repository, I${entityName}Repository } from '../repositories/${entityLower}Repository'

class ${entityName}Service {
  constructor(private repository: I${entityName}Repository = ${entityLower}Repository) {}

  getAll(): ${entityName}[] {
    return this.repository.findAll()
  }

  getById(id: string): ${entityName} | null {
    return this.repository.findById(id)
  }

  create(data: Create${entityName}Request): ${entityName} {
    return this.repository.create(data)
  }

  update(id: string, data: Update${entityName}Request): ${entityName} | null {
    return this.repository.update(id, data)
  }

  delete(id: string): boolean {
    return this.repository.delete(id)
  }
}

export const ${entityLower}Service = new ${entityName}Service()
export { ${entityName}Service }
`

const controllerTemplate = `import { Context } from 'elysia'
import { ${entityLower}Service } from '../services/${entityLower}Service'
import { Create${entityName}Request, Update${entityName}Request, ${entityName}, ApiError } from '../types/${entityLower}'

export class ${entityName}Controller {
  static getAll(): ${entityName}[] {
    return ${entityLower}Service.getAll()
  }

  static getById({ params, set }: Context): ${entityName} | ApiError {
    const { id } = params as { id: string }
    const item = ${entityLower}Service.getById(id)

    if (!item) {
      set.status = 404
      return {
        error: '${entityName} not found',
        code: '${entityName.toUpperCase()}_NOT_FOUND',
        timestamp: new Date().toISOString(),
        path: \`/api/${entityLower}/\${id}\`
      }
    }

    return item
  }

  static create({ body, set }: Context): ${entityName} {
    const data = body as Create${entityName}Request
    const item = ${entityLower}Service.create(data)
    set.status = 201
    return item
  }

  static update({ params, body, set }: Context): ${entityName} | ApiError {
    const { id } = params as { id: string }
    const data = body as Update${entityName}Request
    const item = ${entityLower}Service.update(id, data)

    if (!item) {
      set.status = 404
      return {
        error: '${entityName} not found',
        code: '${entityName.toUpperCase()}_NOT_FOUND',
        timestamp: new Date().toISOString(),
        path: \`/api/${entityLower}/\${id}\`
      }
    }

    return item
  }

  static delete({ params, set }: Context): { message: string } | ApiError {
    const { id } = params as { id: string }
    const deleted = ${entityLower}Service.delete(id)

    if (!deleted) {
      set.status = 404
      return {
        error: '${entityName} not found',
        code: '${entityName.toUpperCase()}_NOT_FOUND',
        timestamp: new Date().toISOString(),
        path: \`/api/${entityLower}/\${id}\`
      }
    }

    set.status = 200
    return {
      message: '${entityName} deleted successfully'
    }
  }
}
`

const apiClientTemplate = `export interface ${entityName} {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Create${entityName}Request {
  name?: string
}

export interface Update${entityName}Request {
  name?: string
}

export class ${entityName}API {
  private base = '/api'

  async getAll(): Promise<${entityName}[]> {
    const res = await fetch(\`\${this.base}/${entityLower}\`)
    if (!res.ok) throw new Error('Failed to fetch ${entityPlural}')
    return res.json()
  }

  async getById(id: string): Promise<${entityName}> {
    const res = await fetch(\`\${this.base}/${entityLower}/\${id}\`)
    if (!res.ok) throw new Error(\`${entityName} not found: \${id}\`)
    return res.json()
  }

  async create(data: Create${entityName}Request): Promise<${entityName}> {
    const res = await fetch(\`\${this.base}/${entityLower}\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to create ${entityLower}')
    }
    
    return res.json()
  }

  async update(id: string, data: Update${entityName}Request): Promise<${entityName}> {
    const res = await fetch(\`\${this.base}/${entityLower}/\${id}\`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to update ${entityLower}')
    }
    
    return res.json()
  }

  async delete(id: string): Promise<void> {
    const res = await fetch(\`\${this.base}/${entityLower}/\${id}\`, {
      method: 'DELETE'
    })
    
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to delete ${entityLower}')
    }
  }
}

export const ${entityLower}API = new ${entityName}API()
`

// Create directories
const dirs = [
  'src/backend/types',
  'src/backend/repositories', 
  'src/backend/services',
  'src/backend/controllers'
]

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
})

// Write files
const files = [
  [`src/backend/types/${entityLower}.ts`, typeTemplate],
  [`src/backend/repositories/${entityLower}Repository.ts`, repositoryTemplate],
  [`src/backend/services/${entityLower}Service.ts`, serviceTemplate],
  [`src/backend/controllers/${entityLower}Controller.ts`, controllerTemplate],
  [`src/lib/${entityLower}-api-client.ts`, apiClientTemplate]
]

files.forEach(([filePath, content]) => {
  fs.writeFileSync(filePath, content)
  console.log(`✅ Created: ${filePath}`)
})

console.log(\`
🚀 ${entityName} API generated successfully!

Next steps:
1. Add routes to src/lib/elysia.ts:
   .get('/${entityLower}', ${entityName}Controller.getAll)
   .get('/${entityLower}/:id', ${entityName}Controller.getById)  
   .post('/${entityLower}', ${entityName}Controller.create)
   .put('/${entityLower}/:id', ${entityName}Controller.update)
   .delete('/${entityLower}/:id', ${entityName}Controller.delete)

2. Import controller in src/lib/elysia.ts:
   import { ${entityName}Controller } from '../backend/controllers/${entityLower}Controller'

3. Test: npm test
4. Run: npm run dev
\`)
`