describe('mock return value', () => {
  it('should return a mocked value', () => {
      const mock = jest.fn()
      mock.mockReturnValue('abc')
      const result = mock()
      expect(result).toBe('abc')
  })
})
