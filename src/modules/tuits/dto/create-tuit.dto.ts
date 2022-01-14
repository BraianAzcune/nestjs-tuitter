import { IsObject, IsString, ValidateNested } from 'class-validator';

/**
 * el nombre userOnFly es debido
 * a que estamos creando un usuario en el momento en que se envia el tuit.
 * no es deseable, pero asi estaba el ejemplo.
 * !ademas aqui existe una dependencia implicita, con user.entity.ts, si cambia este
 * ! tendra que ser cambiado este tambien.
 */
class userOnFly {
    @IsString()
    username: string;
    @IsString()
    password: string;
}

export class CreateTuitDto {
    //! BUG en class-validator: si se envia un objeto den vez de un string, lo acepta.
    @IsString()
    readonly message: string;

    @IsObject()
    @ValidateNested()
    readonly user: userOnFly;
}
