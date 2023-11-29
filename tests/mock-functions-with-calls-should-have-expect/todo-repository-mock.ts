import {Todo, TodoRepository} from '../../src/todo'
import {
    jestMockWithExpect,
    MockWithExpect,
    ObjectWithMockFunctions
} from './mocks-with-expect-should-have-been-called'

export class TodoRepositoryMock implements TodoRepository, ObjectWithMockFunctions {
    saveTodoMock: MockWithExpect = jestMockWithExpect('saveTodoMock')
    getTodoByIdMock: MockWithExpect = jestMockWithExpect('getTodoByIdMock')

    getTodoById(id: number): Promise<Todo> {
        return this.getTodoByIdMock(id)
    }

    saveTodo(todo: Todo): Promise<Todo> {
        return this.saveTodoMock(todo)
    }

    getMockFunctions(): MockWithExpect[] {
        return [this.saveTodoMock, this.getTodoByIdMock]
    }
}
