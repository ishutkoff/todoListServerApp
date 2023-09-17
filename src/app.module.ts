import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { TodosModule } from './todos/todos.module'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from 'database.config'

@Module({
    imports: [
        UsersModule,
        TodosModule,
        AuthModule,
        TypeOrmModule.forRoot(databaseConfig),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
