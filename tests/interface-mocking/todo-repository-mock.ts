import {Todo, TodoRepository} from "../../src/todo";

export class TodoRepositoryMock implements TodoRepository {
    saveTodoMock = jest.fn()
    getTodoByIdMock = jest.fn()

    getTodoById(id: number): Promise<Todo> {
        return this.getTodoByIdMock(id)
    }

    saveTodo(todo: Todo): Promise<Todo> {
        return this.saveTodoMock(todo)
    }
}
