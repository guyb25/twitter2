import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/models/entities/account.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountValidationModule } from 'src/validation/account-validation/account-validation.module';
import { AccountValidationService } from 'src/validation/account-validation/account-validation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    AccountValidationModule
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountValidationService]
})
export class AccountModule {}
