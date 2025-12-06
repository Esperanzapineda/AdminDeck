import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
//Se conecta al iniciar el modulo
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  //se deconecta al cerrar la aplicacion
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
