import { Module } from '@nestjs/common'
import { TodosController } from './todos.controller'
import { TodosService } from './todos.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from './todo.entity'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Todo, User])],
    controllers: [TodosController],
    providers: [TodosService, UsersService],
})
export class TodosModule {}
