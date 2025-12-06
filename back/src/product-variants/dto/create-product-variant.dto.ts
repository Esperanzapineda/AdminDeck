import { IsNotEmpty, IsInt, IsNumber, IsString, IsUUID, Min } from "class-validator";

export class CreateProductVariantDto {
    @IsString()
    @IsNotEmpty()
    optionName: string; //talla, color

    @IsString()
    @IsNotEmpty()
    optionValue: string; //xl, rojo

    @IsInt()
    @Min(0)
    stock: number;

    @IsNumber()
    @Min(0)
    price: number;

    //relacion con producto
    @IsUUID()
    @IsNotEmpty()
    productId: string;
}
