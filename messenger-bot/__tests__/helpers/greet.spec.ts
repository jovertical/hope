import greet from '../../src/helpers/greet'

test('Helper utilities', () => {
    const message = greet('HOPE')

    expect(message).toBe(`Hello HOPE!`)
})
