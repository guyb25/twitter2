import { Global, Module } from '@nestjs/common';
import { AccountModule } from './endpoints/account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/models/entities/account.entity';
import { AuthModule } from './endpoints/auth/auth.module';
import { DtoSerializerModule } from './providers/dto-serializer/dto-serializer.module';
import { ValidationModule } from './providers/validation/validation.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    AccountModule,
    ValidationModule,
    AuthModule,
    DtoSerializerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('TWEET_DB_HOST'),
          port: config.get('TWEET_DB_PORT'),
          username: config.get('TWEET_DB_USERNAME'),
          password: config.get('TWEET_DB_PASSWORD'),
          database: config.get('TWEET_DB_DATABASE_NAME'),
          entities: [Account],
          synchronize: true
        }
      }
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
