import {Todo, TodoRepository} from '../../../src/todo'

export class GetTimeSpentOnTodoUsecase {
    constructor(private readonly todoRepository: TodoRepository) {
    }

    async getTimeSpent(id: number): Promise<number> {
        const todo = await this.todoRepository.getTodoById(id)
        return todo.timeSpent!
    }
}
