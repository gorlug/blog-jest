import {Todo} from "../../src/todo";
import {S3Mock} from "./s3-mock";

const s3Mock = createS3ClientMock()
import { AwsTodoRepository } from '../../src/aws-todo-repository'

describe('AWS Todo Repository', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should create a todo', async () => {
        // arrange
        const todo: Todo = {
            id: 1,
            name: 'todo'
        }
        const repository = new AwsTodoRepository()
        // act
        await repository.saveTodo(todo)
        // assert
        expect(s3Mock.putObjectMock).toHaveBeenCalledWith({
            Bucket: 'todo-bucket',
            Key: `${todo.id}`,
            Body: JSON.stringify(todo),
        })
    })

    it('should get a todo', async () => {
        // arrange
        const todo: Todo = {
            id: 1,
            name: 'todo'
        }
        s3Mock.getObjectMock.mockResolvedValue({
            Body: Buffer.from(JSON.stringify(todo))
        })
        const repository = new AwsTodoRepository()
        // act
        const result = await repository.getTodoById(1)
        // assert
        expect(result).toEqual(todo)
        expect(s3Mock.getObjectMock).toHaveBeenCalledWith({
            Bucket: 'todo-bucket',
            Key: `${todo.id}`,
        })
    })

})

function createS3ClientMock() {
    const s3Mock = new S3Mock()
    jest.mock('aws-sdk', () => {
        return {
            S3: jest.fn(() => s3Mock),
        }
    })
    return s3Mock
}
