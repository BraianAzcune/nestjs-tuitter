import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    IsNumber,
    IsOptional,
    IsPositive,
    MinLength,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    Validate,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Tuit } from '../tuit.entity';

@ValidatorConstraint({ name: 'opcionesOrdenamiento', async: true })
@Injectable()
class OpcionesOrdenamientoValido implements ValidatorConstraintInterface {
    opcionesOrdenamiento = [];

    constructor(
        @InjectRepository(Tuit)
        private readonly tuitRepository: Repository<Tuit>,
    ) {}

    validate(text: string, args: ValidationArguments) {
        console.log(
            'dentro de opcionesOrdenamientoValido, funciono inyectar?=',
            this.tuitRepository,
        );
        return true;
    }

    defaultMessage(args: ValidationArguments) {
        // here you can provide default error message if validation failed
        const opciones = 'asasd';
        return 'Debes elegir una opcion de ordenamiento valida para tuits: [${opciones}]';
    }
}

export class PaginationQueryDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    limit?: number;
    @IsNumber()
    @IsPositive()
    @IsOptional()
    offset?: number;

    @IsOptional()
    @MinLength(3, {
        message: 'El campo <searchTerm> debe tener al menos 3 caracteres',
    })
    searchTerm?: string;

    @MinLength(3, {
        message: 'El campo <orderBy> debe tener al menos 3 caracteres',
    })
    @Validate(OpcionesOrdenamientoValido)
    @IsOptional()
    orderBy?: string;
}
