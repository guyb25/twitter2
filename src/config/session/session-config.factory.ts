import { ConfigService } from "@nestjs/config";
import RedisStore from "connect-redis";
import { Redis } from "ioredis";

export const createSessionConfig = (configService: ConfigService) => {
    return {
        store: new RedisStore({
            client: new Redis(configService.get<number>('SESSION_REDIS_PORT'), configService.get<string>('SESSION_REDIS_HOST')),
            ttl: configService.get<number>('SESSIION_REDIS_EXP_SECONDS')
          }),
          secret: configService.get<string>('SESSION_SECRET'),
          resave: false,
          saveUninitialized: false,
    }
}