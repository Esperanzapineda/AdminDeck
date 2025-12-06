import { ProductsStatus } from "@prisma/client";
import { IsNotEmpty, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsEnum(ProductsStatus)
    @IsOptional()
    status?: ProductsStatus;
    
    //Relaciones
    @IsUUID()
    @IsNotEmpty()
    categoryId: string;

    @IsUUID()
    @IsOptional()
    brandId?: string;
}
