import {mock} from 'jest-mock-extended'
import {TodoRepository, CreateTodoUseCase, GetTodoUseCase, Todo} from "../src/todo";

describe('jest-mock-extended', () => {
    it('should create a todo', async () => {
        // arrange
        const todoRepository = mock<TodoRepository>()
        const todo = {id: 1, name: 'todo'}
        const todoUseCase = new CreateTodoUseCase(todoRepository)

        // act
        await todoUseCase.create(todo)

        // assert
        expect(todoRepository.saveTodo).toHaveBeenCalledWith(todo)
    })

    it('should get a todo', async () => {
        // arrange
        const abcMock = new AbcMock()
        const todoRepository = mock<TodoRepository>()
        const todo = {id: 1, name: 'todo'}
        abcMock.getTodoByIdMock.mockResolvedValue(todo)
        todoRepository.getTodoById.calledWith(1).mockResolvedValue(todo)

        const getTodoUseCase = new GetTodoUseCase(todoRepository)

        // act
        const result = await getTodoUseCase.get(1)

        // assert
        expect(result).toEqual(todo)
    })
})

class AbcMock implements TodoRepository {
    getTodoByIdMock = jest.fn()
    saveTodoMock = jest.fn()
    getTodoById(id: number): Promise<Todo> {
        return this.getTodoByIdMock(id)
    }

    saveTodo(todo: Todo): Promise<Todo> {
        return this.saveTodoMock(todo)
    }

}
