import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from './secret'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const authorizationHeader = request.headers.authorization

        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            const token = authorizationHeader.substring(7)
            try {
                const payload = await this.jwtService.verifyAsync(token, {
                    secret: jwtConstants.secret,
                })
                if (payload) {
                    request['user'] = payload
                    return true
                }
            } catch (error) {
                throw new UnauthorizedException()
            }
        }

        return false
    }
}
