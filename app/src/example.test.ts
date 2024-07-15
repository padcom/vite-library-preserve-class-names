import { it, expect } from 'vitest'
import { Person } from 'library'
import inspect from 'util-inspect'

it('will preserve class name', () => {
  const person = new Person('Jane')
  expect(person.constructor).toBe(Person)
  expect(inspect(person, false)).toBe("{ name: 'Jane' }")
})
