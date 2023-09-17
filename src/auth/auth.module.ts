import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './secret'
import { UsersService } from 'src/users/users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/users/user.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '120m' },
        }),
    ],
    providers: [AuthService, UsersService],
    controllers: [AuthController],
})
export class AuthModule {}
