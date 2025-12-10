import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'El email no es valido' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/,
        {message: 'Contraseña Incorrecta'}
    )
    password: string;
}