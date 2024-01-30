import { describe, test, expect } from 'vitest'

function sum(a: number, b: number) {
  return a + b
}
describe('fake test', () => {
  test('1+1', () => {
    expect(sum(1, 1)).toEqual(2)
  })
})
