import {Todo} from '../../src/todo'
import {GetTimeSpentOnTodoUsecase} from './usecases/get-time-spent-on-todo.usecase'
import {GetTimeSpentOnTodoUnexpectedUsecase} from './usecases/get-time-spent-on-todo-unexpected.usecase'
import {mocksWithExpectShouldHaveBeenCalled} from './mocks-with-expect-should-have-been-called'
import {expectMock} from './mocks-with-expect-should-have-been-called'
import {TodoRepositoryMock} from './todo-repository-mock'

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
        expectMock(todoRepo.getTodoByIdMock).toHaveBeenCalledWith(1)
        expect(() => mocksWithExpectShouldHaveBeenCalled(todoRepo.getMockFunctions())).not.toThrowError()
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
        expectMock(todoRepo.getTodoByIdMock).toHaveBeenCalledWith(1)
        expect(() => mocksWithExpectShouldHaveBeenCalled(todoRepo.getMockFunctions()))
            .toThrowError('Mock function saveTodoMock has no expect')
    })
})

function createTodo(): Todo {
    return {
        id: 1,
        name: 'todo',
        timeSpent: 30
    }
}
