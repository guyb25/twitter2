import { Injectable } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';

@Injectable()
export class DtoSerializerService {
    serialize(serialized: ClassConstructor<any>, origin: any) {
        return plainToInstance(serialized, origin, {
            excludeExtraneousValues: true
        })
    }
}
