import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from 'src/users/dto/createUserDto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
    async createNewUser(@Body() user: CreateUserDto) {
        return await this.authService.signUp(user)
    }

    @Post('sign-in')
    async refreshTokens(@Body() authData: { email: string; password: string }) {
        const { email, password } = authData
        return await this.authService.signIn(email, password)
    }
}
