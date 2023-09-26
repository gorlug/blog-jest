import {when} from "jest-when";

describe('mock implementation', () => {
    it('should return a mocked value based on input', () => {
        const mock = jest.fn()

        when(mock).calledWith(1).mockReturnValue('abc')

        const value = mock(1)
        expect(value).toBe('abc')

        // should return undefined since there is no value specified for 2
        const value2 = mock(2)
        expect(value2).toBeUndefined()
    })
})
