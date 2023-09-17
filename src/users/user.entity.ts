import { v4 as uuidv4 } from 'uuid'

import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Todo } from 'src/todos/todo.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column()
    userName: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Todo, (todo) => todo.user)
    userTodos: Todo[]
}
