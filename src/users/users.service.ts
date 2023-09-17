import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/createUserDto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { User } from './user.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(user: CreateUserDto): Promise<User> {
        const existingUser = await this.getUserByEmail(user.email)

        if (existingUser) {
            throw new BadRequestException(
                'Пользователь с таким email уже существует',
            )
        }
        const newUser = this.userRepository.create({
            userName: user.userName,
            email: user.email,
            password: await bcrypt.hash(user.password, 10),
        })
        return await this.userRepository.save(newUser)
    }

    async getUserById(userId: string) {
        const user = await this.userRepository.findOne({
            where: {
                userId: userId,
            },
        })

        return user
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {
                email: email,
            },
        })

        return user
    }

    async validateUser(email: string, password?: string): Promise<boolean> {
        const user = await this.getUserByEmail(email)

        if (!user || !password) return false

        if (bcrypt.compareSync(password, user.password)) {
            return true
        } else {
            return false
        }
    }
}
