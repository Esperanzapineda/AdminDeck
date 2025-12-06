import { Injectable } from '@nestjs/common';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductVariantsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductVariantDto: CreateProductVariantDto) {
    return this.prisma.productVariant.create({
      data: createProductVariantDto
    });
  }

  async findAll() {
    return this.prisma.productVariant.findMany();
  }

  async findOne(id: string) {
    return this.prisma.productVariant.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateProductVariantDto: UpdateProductVariantDto) {
    return this.prisma.productVariant.update({
      where: { id },
      data: updateProductVariantDto,
    });
  }

  async remove(id: string) {
    return this.prisma.productVariant.delete({
      where: { id },
    });
  }
}
