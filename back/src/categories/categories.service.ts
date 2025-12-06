import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  //Crear categoria
  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  //Listar todo incluye subcategorias
  async findAll() {
    return this.prisma.category.findMany({
      include: { children: true }, //trae las subcategorias junto con la categoria
    });
  }

  async findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include:{
        children: true, //vemos al hijo
        parent: true, //vemos al padre
      }
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
