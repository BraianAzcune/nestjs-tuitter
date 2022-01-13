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

/**
 * validador personalizado creado para usarse en la clase PaginationQueryDto
 * necesita acceder a la base de datos para obtener las columnas que posee tuit
 * y de esta forma saber que columna es valida.
 *
 * para hacer que una clase con el decorador @ValidatorConstraint pueda usar @Inyectable
 * se siguio este tutorial: https://stackoverflow.com/a/60141437
 */
@ValidatorConstraint({ name: 'opcionesOrdenamiento', async: true })
@Injectable()
export class OpcionesOrdenamientoValido
    implements ValidatorConstraintInterface
{
    opcionesOrdenamiento: string[];

    constructor(
        @InjectRepository(Tuit)
        private readonly tuitRepository: Repository<Tuit>,
    ) {
        this.opcionesOrdenamiento = this.tuitRepository.metadata.columns.map(
            (v) => v.propertyName,
        );
    }

    validate(text: string, args: ValidationArguments) {
        return this.opcionesOrdenamiento.some((v) => v === text);
    }

    defaultMessage(args: ValidationArguments) {
        return `Debes elegir una opcion de ordenamiento valida para tuits: [${this.opcionesOrdenamiento}]`;
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
