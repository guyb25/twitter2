import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/models/entities/account.entity';
import { AccountValidationService } from './account-validation.service';
import { AuthValidationService } from './auth-validation.service';

@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    providers: [AccountValidationService, AuthValidationService]
})
export class ValidationModule {}
