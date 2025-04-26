import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    Logger,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import * as CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.SECRET_KEY;

@Injectable()
export class EncryptionInterceptor implements NestInterceptor {
    private readonly logger = new Logger(EncryptionInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                // Encrypt response data before sending it to the frontend, hence when seeing from postman or network tab in the browser we will see encrypted data and need to decrypt in the frontend
                try {
                    const encryptedData = this.encryptData(data);
                    return { encryptedData };
                } catch (error) {
                    this.logger.error('Error encrypting data', error);
                    throw new HttpException('Encryption failed', 500);
                }
            })
        );
    }

    private encryptData(data: any): string {
        const dataString = JSON.stringify(data);
        return CryptoJS.AES.encrypt(dataString, SECRET_KEY).toString();
    }
}
