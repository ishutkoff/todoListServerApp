import { v4 as uuidv4 } from 'uuid'

import {
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { User } from 'src/users/user.entity'

@Entity()
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    todoId: string

    @Column()
    title: string

    @Column()
    description: string

    @UpdateDateColumn()
    updated_at: Date

    @Column({ default: false })
    isCompleted: boolean

    @ManyToOne(() => User, (user) => user.userTodos)
    user: User
}
