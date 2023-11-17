export interface Todo {
    id: number
    name: string
    timeSpent?: number
}

export interface TodoRepository {
    saveTodo(todo: Todo): Promise<Todo>
    getTodoById(id: number): Promise<Todo>
}

export class CreateTodoUseCase {
    constructor(private readonly todoRepository: TodoRepository) {}

    async create(todo: Todo): Promise<Todo> {
        return this.todoRepository.saveTodo(todo)
    }
}

export class GetTodoUseCase {
    constructor(private readonly todoRepository: TodoRepository) {
    }

    async get(id: number): Promise<Todo> {
        return this.todoRepository.getTodoById(id)
    }
}
