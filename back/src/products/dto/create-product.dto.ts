import { ProductsStatus } from "@prisma/client";
import { Type, Transform } from "class-transformer"; 
import { IsNotEmpty, IsEnum, IsOptional, IsString, IsUUID, IsArray, ValidateNested, IsNumber } from "class-validator";

class CreateProductVariantDto {
    @IsString()

    optionName: string;

    @IsString()
    optionValue: string;

    @IsNumber()
    @Type(() => Number) 
    price: number;

    @IsNumber()
    @Type(() => Number)
    stock: number;
}

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

    @IsArray()
    @ValidateNested({ each: true }) 
    @Type(() => CreateProductVariantDto)
    @Transform(({ value }) => {
    //si llega como string JSON
    if (typeof value === "string") {
        try {
        return JSON.parse(value) as CreateProductVariantDto[];
        } catch {
        return [];
        }
    }
    //si llega como objeto
    if (typeof value === "object" && !Array.isArray(value)) {
        return Object.values(value) ;
    }

    // si ya viene como array
    return value as CreateProductVariantDto[];
    })
    variants: CreateProductVariantDto[];
}
