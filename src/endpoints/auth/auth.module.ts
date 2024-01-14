import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionService } from 'src/data/session/session.service';
import { SessionModule } from 'src/data/session/session.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/models/entities/account.entity';
import { AccountValidationModule } from 'src/validation/account-validation/account-validation.module';
import { AccountValidationService } from 'src/validation/account-validation/account-validation.service';

@Module({
  imports: [
    SessionModule, 
    AccountValidationModule, 
    TypeOrmModule.forFeature([Account]),
  ],
  controllers: [AuthController],
  providers: [AuthService, SessionService, AccountValidationService]
})
export class AuthModule {}
