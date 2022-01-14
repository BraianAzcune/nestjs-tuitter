import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

/**
 * las opciones de validationPipe
 * transform, hace que el body recibido sea casteado automaticamente a la clase que le definimos
 * whitelist, hace que solo se acepten los campos que le definimos
 * forbidNonWhitelisted, hace que no se acepten campos que no le definimos, retorna un 400 bad request
 */

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // esto es para que las clases de class-validator puedan usar @Injectable() de nestjs
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true, //convierte los string a number de forma automatica.
            },
        }),
    );

    await app.listen(AppModule.PORT);
}
bootstrap();
