import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    return this.prisma.brand.create({
      data: createBrandDto,
    });
  }

  async findAll() {
    return this.prisma.brand.findMany();
  }

  async findOne(id: string) {
    return this.prisma.brand.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    return this.prisma.brand.update({
      where: { id },
      data: updateBrandDto,
    });
  }

  async remove(id: string) {
    return this.prisma.brand.delete({
      where: { id },
    });
  }
}
