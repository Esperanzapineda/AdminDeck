import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'El email no es valido' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/,
        {message: 'La contraseña debe tener entre 8 y 15 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'}
    )
    password: string;
}