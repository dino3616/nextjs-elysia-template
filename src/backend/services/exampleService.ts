import { Example, CreateExampleRequest, UpdateExampleRequest, ExampleResponse } from '../types/example'
import { exampleRepository, IExampleRepository } from '../repositories/exampleRepository'

class ExampleService {
  constructor(private repository: IExampleRepository = exampleRepository) {}

  getAll(): ExampleResponse[] {
    const examples = this.repository.findAll()
    return examples.map(example => this.toResponse(example))
  }

  getById(id: string): ExampleResponse | null {
    const example = this.repository.findById(id)
    return example ? this.toResponse(example) : null
  }

  create(data: CreateExampleRequest): ExampleResponse {
    const newExample = this.repository.create(data)
    return this.toResponse(newExample)
  }

  update(id: string, data: UpdateExampleRequest): ExampleResponse | null {
    const updatedExample = this.repository.update(id, data)
    return updatedExample ? this.toResponse(updatedExample) : null
  }

  delete(id: string): boolean {
    return this.repository.delete(id)
  }

  private toResponse(example: Example): ExampleResponse {
    return {
      id: example.id,
      title: example.title,
      description: example.description,
      category: example.category,
      isActive: example.isActive,
      createdAt: example.createdAt,
      updatedAt: example.updatedAt
    }
  }
}

export const exampleService = new ExampleService()
export { ExampleService }