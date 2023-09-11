import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Student,
  StudentProps,
} from '@/domain/forum/enterprise/entities/student'

export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityID,
) {
  const student = Student.create(
    {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456-hashed',
      ...override,
    },
    id,
  )

  return student
}
