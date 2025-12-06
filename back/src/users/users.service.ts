import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  //Crear un usuario
  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  //Buscar por email
  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
