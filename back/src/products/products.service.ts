import { Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    let imageUrl: string | null = null;

    if(file){
      try{
        const result = await this.cloudinary.uploadFile(file); //Llamamos al metodo
        imageUrl = result.secure_url; //obtenemos la url publica
      }catch(error) {
        console.error(error);
        throw new InternalServerErrorException("Error al subir la imagen a cloudinary")
      }
    }
    //guardamos en la base de datos con o sin url
    return  this.prisma.product.create({
      data: {
        ...createProductDto,
        imageUrl: imageUrl,
      }
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        category: true, //traemos el objeto completo de categorias
        brand: true, //traemos la marca completa
        variants: true, //taremos las tallas / precios 
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
    if(!product){
      throw new NotFoundException(`Producto con ID ${id} no exisite.`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
      });
  }
}
