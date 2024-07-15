import { Person } from './person'

export function sayHello(name: string) {
  console.log('Hello', new Person(name))
}
