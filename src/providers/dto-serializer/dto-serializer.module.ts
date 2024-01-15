import { Module } from '@nestjs/common';
import { DtoSerializerService } from './dto-serializer.service';

@Module({
  providers: [DtoSerializerService]
})
export class DtoSerializerModule {}
