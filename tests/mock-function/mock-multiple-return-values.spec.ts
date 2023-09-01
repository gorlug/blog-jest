describe('mock multiple return values', () => {
    it('should return multiple mocked values', () => {
        const mock = jest.fn()

        mock.mockReturnValueOnce('mocked value')
        mock.mockReturnValueOnce('different value')

        const firstResult = mock() // mocked value
        expect(firstResult).toBe('mocked value')
        const secondResult = mock() // different value
        expect(secondResult).toBe('different value')
        const thirdResult = mock() // undefined -> it was mocked only once
        expect(thirdResult).toBe(undefined)
    })
})
