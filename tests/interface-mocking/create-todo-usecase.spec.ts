import {TodoRepositoryMock} from "./todo-repository-mock";
import {CreateTodoUseCase} from "../../src/todo";

describe('CreateTodoUseCase', () => {
    it('should create a todo', async () => {
        // arrange
        const todoRepositoryMock = new TodoRepositoryMock()
        const todo = {
            id: 1,
            name: 'todo',
        }
        const todoUseCase = new CreateTodoUseCase(todoRepositoryMock)
        // act
        await todoUseCase.create(todo)
        // assert
        expect(todoRepositoryMock.saveTodoMock).toHaveBeenCalledWith(todo)
    })
})
