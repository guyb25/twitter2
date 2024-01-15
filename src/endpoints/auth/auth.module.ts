import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ValidationModule } from 'src/providers/validation/validation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/models/entities/account.entity';
import { AuthValidationService } from 'src/providers/validation/auth-validation.service';

@Module({
  imports: [
    ValidationModule,
    TypeOrmModule.forFeature([Account]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthValidationService],
  exports: [AuthService]
})
export class AuthModule {}
