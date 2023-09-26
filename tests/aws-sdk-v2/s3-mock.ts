import {GetObjectRequest, PutObjectRequest} from "aws-sdk/clients/s3";

export class S3Mock {
    getObjectMock = jest.fn()
    putObjectMock = jest.fn()

    getObject(params: GetObjectRequest) {
        return {
            promise: () => this.getObjectMock(params),
        }
    }

    putObject(params: PutObjectRequest) {
        return {
            promise: () => this.putObjectMock(params),
        }
    }

}
