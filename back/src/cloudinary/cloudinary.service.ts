import { Injectable } from '@nestjs/common';
import { v2 as cloudinary,  UploadApiResponse, UploadApiErrorResponse} from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
    async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                folder: 'Poducts',
                },
                (error: UploadApiErrorResponse, result: UploadApiResponse) => {
                if (error) {
                    return reject((new Error(error.message || "Error al subir a Cloudinary")));
                    }
                resolve(result);
                },
            );
        
            const readableStream = new Readable();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            readableStream.push(file.buffer);
            readableStream.push(null);
            readableStream.pipe(uploadStream);
        });
    }
}