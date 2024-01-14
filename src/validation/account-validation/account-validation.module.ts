import { Module } from '@nestjs/common';
import { AccountValidationService } from './account-validation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/models/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountValidationService]
})
export class AccountValidationModule {}
