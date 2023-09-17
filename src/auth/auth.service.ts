import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/users/dto/createUserDto'
import { UsersService } from 'src/users/users.service'
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
    ) {}

    async signUp(user: CreateUserDto) {
        const newUser = await this.userService.createUser({
            userName: user.userName,
            email: user.email,
            password: user.password,
        })

        return await this.signIn(newUser.email, user.password)
    }

    async signIn(email: string, password: string) {
        if (!email || !password)
            throw new UnauthorizedException('Неверные учётные данные')

        const isValid = await this.userService.validateUser(email, password)

        if (!isValid) {
            throw new UnauthorizedException('Неверные учётные данные')
        }

        const user = await this.userService.getUserByEmail(email)

        const payload = {
            userId: user.userId,
            userName: user.userName,
            email: user.email,
        }

        return {
            accessToken: await this.jwtService.signAsync(payload),
        }
    }
}
