import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/models/entities/account.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountValidationService } from 'src/providers/validation/account-validation.service';
import { DtoSerializerModule } from 'src/providers/dto-serializer/dto-serializer.module';
import { DtoSerializerService } from 'src/providers/dto-serializer/dto-serializer.service';
import { ValidationModule } from 'src/providers/validation/validation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    ValidationModule,
    DtoSerializerModule
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountValidationService, DtoSerializerService]
})
export class AccountModule {}
