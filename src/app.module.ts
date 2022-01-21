import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//own imports
import { TuitsModule } from './modules/tuits/tuits.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        TuitsModule,
        UsersModule,
    ],
})
export class AppModule {
    static PORT: number;
    constructor(private readonly configService: ConfigService) {
        AppModule.PORT = +this.configService.get('PORT'); //se puso + para castear a number.
    }
}
