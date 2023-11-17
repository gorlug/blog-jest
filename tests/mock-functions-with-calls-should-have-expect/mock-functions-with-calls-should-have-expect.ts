import {expect as expectJest} from '@jest/globals'
import JestMatchers = jest.JestMatchers

export function expect(object: any): JestMatchers<any> {
    if (object.mock) {
        object.hasExpect = true
    }
    return expectJest(object)
}

export function mockFunctionsWithCallsShouldHaveExpect(mockClass: any) {
    Object.getOwnPropertyNames(mockClass).forEach((propName: string) => {
        const prop = mockClass[propName]
        if (typeof prop === 'function') {
            if (prop.mock.calls.length > 0) {
                if (!prop.hasExpect) {
                    throw Error(`Mock function ${propName} has no expect`)
                }
            }
        }
    })
}

