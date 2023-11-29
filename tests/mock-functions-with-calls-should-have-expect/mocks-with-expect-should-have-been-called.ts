import {expect as expectJest} from '@jest/globals'
import JestMatchers = jest.JestMatchers
import Mock = jest.Mock

export type MockWithExpect = Mock & { hasExpect: boolean }

export function expectMock(object: MockWithExpect): JestMatchers<any> {
    object.hasExpect = true
    return expectJest(object)
}

export interface ObjectWithMockFunctions {
    getMockFunctions(): Mock[]
}

export function jestMockWithExpect(name: string): MockWithExpect {
    const mock = jest.fn() as MockWithExpect
    mock.hasExpect = false
    mock.mockName(name)
    return mock
}

export function mocksWithExpectShouldHaveBeenCalled(mocks: MockWithExpect[]) {
    for (const mockWithExpect of mocks) {
        const functionHasCalls = mockWithExpect.mock.calls.length > 0
        const doesNotHaveExpect = !mockWithExpect.hasExpect
        if (functionHasCalls && doesNotHaveExpect) {
            throw Error(`Mock function ${mockWithExpect.getMockName()} has no expect`)
        }
    }
}
