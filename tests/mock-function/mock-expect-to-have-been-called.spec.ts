describe('expect the mock to have been called', () => {
    it('should expect the mock to have been called', () => {
        const mock = jest.fn()
        mock.mockReturnValue('abc')

        const result = mock()

        expect(result).toBe('abc')
        expect(mock).toHaveBeenCalled()
    })

    it('should have been called with a specific value', () => {
        const mock = jest.fn()

        mock('abc')

        expect(mock).toHaveBeenCalledWith('abc')
    })

    it('should be called with different multiple values', () => {
        const mock = jest.fn()

        mock('abc')
        mock('def')

        expect(mock).toHaveBeenCalledWith('abc')
        expect(mock).toHaveBeenCalledWith('def')
    })
})
