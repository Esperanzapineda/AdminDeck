import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, Min, IsUUID, IsNumber, IsString, ValidateNested, IsOptional, IsArray } from "class-validator";

//DTO para cada item de la lista
export class CreateOrderItemDto{
    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsInt()
    @Min(1)
    quantity: number;

    @IsNumber()
    @Min(0)
    price: number; //Precio unitario al momento de la compra
}

//DTO para la orden completa
export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    clientName: string;

    @IsString()
    @IsNotEmpty()
    clientEmail: string;

    @IsString()
    @IsOptional()
    shippingInfo?: string;

    //Usuario logueado, podriamos recibir su ID
    @IsUUID()
    @IsOptional()
    userId?: string;

    //Validar lista de productos
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];

}
