import {TodoRepositoryMock} from '../interface-mocking/todo-repository-mock'
import {Todo} from '../../src/todo'
import {GetTimeSpentOnTodoUsecase} from './usecases/get-time-spent-on-todo.usecase'
import {GetTimeSpentOnTodoUnexpectedUsecase} from './usecases/get-time-spent-on-todo-unexpected.usecase'
import {mockFunctionsWithCallsShouldHaveExpect} from './mock-functions-with-calls-should-have-expect'
import {expect} from './mock-functions-with-calls-should-have-expect'

describe('GetTimeSpentOnTodoUseCase', () => {

    it('usecase handles as expected', async () => {
        // arrange
        const todoRepo = new TodoRepositoryMock()
        todoRepo.getTodoByIdMock.mockResolvedValue(createTodo())
        const usecase = new GetTimeSpentOnTodoUsecase(todoRepo)

        // act
        const timeSpent = await usecase.getTimeSpent(1)

        // assert
        expect(timeSpent).toEqual(30)
        expect(todoRepo.getTodoByIdMock).toHaveBeenCalledWith(1)
    })

    it('should call an unexpected method', async () => {
        // arrange
        const todoRepo = new TodoRepositoryMock()
        todoRepo.getTodoByIdMock.mockResolvedValue(createTodo())
        const usecase = new GetTimeSpentOnTodoUnexpectedUsecase(todoRepo)

        // act
        const timeSpent = await usecase.getTimeSpent(1)

        // assert
        expect(timeSpent).toEqual(30)
        expect(todoRepo.getTodoByIdMock).toHaveBeenCalledWith(1)
        expect(() => mockFunctionsWithCallsShouldHaveExpect(todoRepo)).toThrowError('Mock function saveTodoMock has no expect')
    })
})

function createTodo(): Todo {
    return {
        id: 1,
        name: 'todo',
        timeSpent: 30
    }
}
