import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Environment } from 'src/common/enum';
import { ConnectionOptions } from 'typeorm';

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    async useFactory(configService: ConfigService) {
        const isDevEnv =
            configService.get('NODE_ENV') !== Environment.PRODUCTION;

        const dbConfig = {
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: +configService.get('DB_PORT'),
            username: configService.get('DB_USER'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            autoLoadEntities: true,
            logging: configService.get('DB_LOGGING') === 'true',
            synchronize: isDevEnv,
        } as ConnectionOptions;

        return dbConfig;
    },
});
