import { Global, Module } from '@nestjs/common';
import { AccountModule } from './endpoints/account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/models/entities/account.entity';
import { AccountValidationModule } from './validation/account-validation/account-validation.module';
import { AuthModule } from './endpoints/auth/auth.module';

@Global()
@Module({
  imports: [
    AccountModule,
    AccountValidationModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'pass',
      database: 'tweetdb',
      entities: [Account],
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
