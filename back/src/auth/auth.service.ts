import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  //Registro
  async register({ password, email, name }: RegisterDto) {
  const userExists = await this.usersService.findOneByEmail(email);

  if(userExists) {
    throw new BadRequestException('El email ya esta registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await this.usersService.create({
    name,
    email,
    password: hashedPassword,
  });
  }

  //Login
  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);
    if(!user) {
    throw new UnauthorizedException('Credenciales incorrectas (email)');
 }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid) {
    throw new BadRequestException('Credenciales incorrectas (password)');
  }

    return {
      message: 'Login exitoso',
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}
