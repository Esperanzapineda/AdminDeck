import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

interface RawVariant {
  optionName: string;
  optionValue: string;
  stock: number | string;
  price: number | string;
}

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    const { variants, ...productData } = createProductDto;
    
    let imageUrl: string | null = null;

    if (file) {
      try {
        const result = await this.cloudinary.uploadFile(file);
        imageUrl = result.secure_url;
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException("Error al subir la imagen a cloudinary");
      }
    }
    let variantsProcessed: { optionName: string; optionValue: string; price: number; stock: number }[] = [];
    
    if (variants) {
      let parsedVariants: unknown = variants;
      
      if (typeof variants === 'string') {
        try {
          parsedVariants = JSON.parse(variants);
        } catch (error) {
          console.error("Error parsing variants JSON", error);
          parsedVariants = [];
        }
      }

      if (Array.isArray(parsedVariants)) {
        variantsProcessed = (parsedVariants as RawVariant[]).map((v) => ({
          optionName: v.optionName,
          optionValue: v.optionValue,
          stock: Number(v.stock),
          price: Number(v.price),
        }));
      }
    }

    return this.prisma.product.create({
      data: {
        ...productData,
        imageUrl: imageUrl,
        variants: {
          create: variantsProcessed,
        },
      },
      include: { variants: true },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        category: true,
        brand: true,
        variants: true,
      },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        variants: true,
      },
    });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no exisite.`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, file?: Express.Multer.File) {
    const { variants, ...productData } = updateProductDto;
    
    let imageUrl: string | undefined;

    if (file) {
      try {
        const result = await this.cloudinary.uploadFile(file);
        imageUrl = result.secure_url;
      } catch (error) {
        console.error("error al leer la imagen", error);
        throw new InternalServerErrorException("Error al actualizar la imagen a cloudinary");
      }
    }

    let variantsProcessed: { optionName: string; optionValue: string; price: number; stock: number }[] = [];

    if (variants) {
      let parsedVariants: unknown = variants;
      
      if (typeof variants === 'string') {
        try {
          parsedVariants = JSON.parse(variants);
        } catch (error) {
          console.error("Error parsing variants JSON", error);
          parsedVariants = [];
        }
      }
      
      if (Array.isArray(parsedVariants)) {
        variantsProcessed = (parsedVariants as RawVariant[]).map((v) => ({
          optionName: v.optionName,
          optionValue: v.optionValue,
          stock: Number(v.stock),
          price: Number(v.price),
        }));
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        ...(imageUrl && { imageUrl }),
        variants: {
          deleteMany: {},
          create: variantsProcessed,
        },
      },
      include: { variants: true },
    });
  }

  async remove(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: {
        status: "ARCHIVED",
      }
    });
  }
}