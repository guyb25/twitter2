import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import Redis from 'ioredis';

@Injectable()
export class SessionService {
  private redisClient: Redis;
  private SESSION_PREFIX: string = "SESSION: "
  private expirationTimeSeconds = 900;

  constructor() {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379
    });
  }

  async createSession(accountId: string): Promise<string> {
    let sessionId = randomUUID()
    let key = this.SESSION_PREFIX + sessionId
    await this.redisClient.set(key, accountId)
    await this.redisClient.expireat(key, this.expirationTimeSeconds)
    return sessionId
  }

  async getSessionOwner(sessionId: string): Promise<string> {
    return this.redisClient.get(this.SESSION_PREFIX + sessionId)
  }

  async deleteSession(sessionId: string): Promise<void> {
    this.redisClient.del(this.SESSION_PREFIX + sessionId)
  }
}