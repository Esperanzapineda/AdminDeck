import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from './claoudinary.provider';

@Module({
    providers: [CloudinaryProvider, CloudinaryService],
    exports: [CloudinaryService], // Exportamos el servicio para que Products pueda usarlo
})
export class CloudinaryModule {}