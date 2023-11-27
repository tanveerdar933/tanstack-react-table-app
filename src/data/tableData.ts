import { Person } from "../types/tableTypes"
import { faker } from '@faker-js/faker'

const newPerson = (): Person => {
  return {
    name: faker.person.fullName(),
    job: faker.person.jobTitle(),
    salary: faker.number.int({ min: 20000, max: 90000 }),
    phone: faker.phone.number('+92 ### #######'),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single',
    ])[0]!,
  }
}

export const makeData = (len: number): Person[] => [
  ...[...Array(len).keys()].map((): Person => ({ ...newPerson() }))
]