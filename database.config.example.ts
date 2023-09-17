import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'todos',
    password: 'todos',
    database: 'i0jsi7pf9c3w',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
}
