import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//own imports
import { TuitsModule } from './modules/tuits/tuits.module';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TuitsModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 60567,
            username: 'postgres',
            password: 'my-weak-password',
            database: 'postgres',
            autoLoadEntities: true,
            logging: true,
            synchronize: true, //only good in dev mode.
        }),
        UsersModule,
    ],
})
export class AppModule {
    static PORT: number;
    constructor(private readonly configService: ConfigService) {
        AppModule.PORT = +this.configService.get('PORT'); //se puso + para castear a number.
    }
}
