import {Todo, TodoRepository} from './todo'
import { S3 } from 'aws-sdk'

export class AwsTodoRepository implements TodoRepository {
    private readonly s3client = new S3()

    async saveTodo(todo: Todo): Promise<Todo> {
        await this.s3client.putObject({
            Bucket: 'todo-bucket',
            Key: `${todo.id}`,
            Body: JSON.stringify(todo),
        }).promise()
        return todo
    }

    async getTodoById(id: number): Promise<Todo> {
        const response = await this.s3client.getObject({
            Bucket: 'todo-bucket',
            Key: `${id}`,
        }).promise()
        return JSON.parse(response.Body!.toString())
    }

}
