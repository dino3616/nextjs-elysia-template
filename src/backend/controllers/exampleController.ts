import { Context } from 'elysia'
import { exampleService } from '../services/exampleService'
import { CreateExampleRequest, UpdateExampleRequest, ExampleResponse, ApiError } from '../types/example'

export class ExampleController {
  static getAll(): ExampleResponse[] {
    return exampleService.getAll()
  }

  static getById({ params, set }: Context): ExampleResponse | ApiError {
    const { id } = params as { id: string }
    const example = exampleService.getById(id)

    if (!example) {
      set.status = 404
      return {
        error: 'Example not found',
        code: 'EXAMPLE_NOT_FOUND',
        timestamp: new Date().toISOString(),
        path: `/api/example/${id}`
      }
    }

    return example
  }

  static create({ body, set }: Context): ExampleResponse {
    const data = body as CreateExampleRequest
    const example = exampleService.create(data)
    set.status = 201
    return example
  }

  static update({ params, body, set }: Context): ExampleResponse | ApiError {
    const { id } = params as { id: string }
    const data = body as UpdateExampleRequest
    const example = exampleService.update(id, data)

    if (!example) {
      set.status = 404
      return {
        error: 'Example not found',
        code: 'EXAMPLE_NOT_FOUND',
        timestamp: new Date().toISOString(),
        path: `/api/example/${id}`
      }
    }

    return example
  }

  static delete({ params, set }: Context): { message: string } | ApiError {
    const { id } = params as { id: string }
    const deleted = exampleService.delete(id)

    if (!deleted) {
      set.status = 404
      return {
        error: 'Example not found',
        code: 'EXAMPLE_NOT_FOUND',
        timestamp: new Date().toISOString(),
        path: `/api/example/${id}`
      }
    }

    set.status = 200
    return {
      message: 'Example deleted successfully'
    }
  }
}