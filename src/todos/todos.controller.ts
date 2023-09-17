import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common'
import { TodosService } from './todos.service'
import { CreateTodoDto } from './dto/createTodoDto'
import { AuthGuard } from 'src/auth/jwt.guard'
import { EditTodoDto } from './dto/editTodoDto'

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @UseGuards(AuthGuard)
    @Get('/list/')
    async getAllTodos(
        @Req() request: Request,
        @Query() queryParams: { searchText: string },
    ) {
        const currentUserId = request['user'].userId
        return await this.todosService.getAllTodos(
            currentUserId,
            queryParams.searchText,
        )
    }

    @UseGuards(AuthGuard)
    @Get('/todo/:todoId')
    async getBtId(@Req() request: Request, @Param('todoId') todoId: string) {
        const currentUserId = request['user'].userId
        return await this.todosService.getById(todoId, currentUserId)
    }

    @UseGuards(AuthGuard)
    @Post('/new/')
    async createTodo(@Req() request: Request, @Body() todoData: CreateTodoDto) {
        const currentUserId = request['user'].userId
        return await this.todosService.createTodo(todoData, currentUserId)
    }

    @UseGuards(AuthGuard)
    @Put('/edit/')
    async editTodo(@Req() request: Request, @Body() todoData: EditTodoDto) {
        const currentUserId = request['user'].userId
        return await this.todosService.editTodo(todoData, currentUserId)
    }

    @UseGuards(AuthGuard)
    @Put('/change-status/:todoId')
    async changeTodoStatus(
        @Req() request: Request,
        @Param('todoId') todoId: string,
        @Body() todoData: { completed: boolean },
    ) {
        const currentUserId = request['user'].userId
        return await this.todosService.changeTodoStatus(
            todoId,
            todoData.completed,
            currentUserId,
        )
    }

    @UseGuards(AuthGuard)
    @Delete(':todoId')
    async removeTodo(@Req() request: Request, @Param('todoId') todoId: string) {
        const currentUserId = request['user'].userId
        return await this.todosService.removeTodo(todoId, currentUserId)
    }
}
