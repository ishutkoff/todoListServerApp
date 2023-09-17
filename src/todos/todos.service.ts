import { ForbiddenException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Todo } from './todo.entity'
import { Like, Repository } from 'typeorm'
import { UsersService } from 'src/users/users.service'
import { CreateTodoDto } from './dto/createTodoDto'
import { EditTodoDto } from './dto/editTodoDto'

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,

        private readonly usersService: UsersService,
    ) {}

    async getAllTodos(userId: string, searchText: string): Promise<Todo[]> {
        return await this.todoRepository.find({
            where: {
                title: Like(`%${searchText ? searchText : ''}%`),
                user: { userId: userId },
            },
            order: {
                updated_at: 'DESC',
            },
        })
    }

    async getById(todoId: string, userId: string): Promise<Todo> {
        const todo = await this.todoRepository.findOne({
            where: {
                todoId: todoId,
            },
            relations: ['user'],
        })

        if (todo.user.userId !== userId)
            throw new ForbiddenException('Доступ запрещён')

        delete todo.user

        return todo
    }

    async createTodo(todo: CreateTodoDto, userId: string): Promise<Todo> {
        const currentUser = await this.usersService.getUserById(userId)
        const newTodo = this.todoRepository.create({
            ...todo,
            user: currentUser,
        })
        await this.todoRepository.save(newTodo)

        delete newTodo.user

        return newTodo
    }
    async editTodo(todo: EditTodoDto, userId: string): Promise<Todo> {
        const editedTodo = await this.todoRepository.findOne({
            where: {
                todoId: todo.todoId,
            },
            relations: ['user'],
        })

        if (editedTodo.user.userId !== userId)
            throw new ForbiddenException('Доступ запрещён')

        editedTodo.title = todo.title
        editedTodo.description = todo.description

        await this.todoRepository.save(editedTodo)

        delete editedTodo.user

        return editedTodo
    }
    async removeTodo(todoId: string, userId: string): Promise<string> {
        const removedTodo = await this.todoRepository.findOne({
            where: {
                todoId: todoId,
            },
            relations: ['user'],
        })

        if (removedTodo.user.userId !== userId)
            throw new ForbiddenException('Доступ запрещён')

        await this.todoRepository.remove(removedTodo)

        delete removedTodo.user

        return todoId
    }
    async changeTodoStatus(
        todoId: string,
        completed: boolean,
        userId: string,
    ): Promise<Todo> {
        const todo = await this.todoRepository.findOne({
            where: {
                todoId: todoId,
            },
            relations: ['user'],
        })

        if (todo.user.userId !== userId)
            throw new ForbiddenException('Доступ запрещён')

        todo.isCompleted = completed

        await this.todoRepository.save(todo)

        delete todo.user

        return todo
    }
}
