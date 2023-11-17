import {Todo, TodoRepository} from '../../../src/todo'

export class GetTimeSpentOnTodoUnexpectedUsecase {
    constructor(private readonly todoRepository: TodoRepository) {
    }

    async getTimeSpent(id: number): Promise<number> {
        const todo = await this.todoRepository.getTodoById(id)
        todo.name = 'changed name'
        await this.todoRepository.saveTodo(todo)
        return todo.timeSpent!
    }
}
