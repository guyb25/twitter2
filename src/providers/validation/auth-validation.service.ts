import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'express-session';
import { Account } from 'src/models/entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthValidationService {
    constructor(@InjectRepository(Account) private readonly accountRepo: Repository<Account>) {}

    /** will validate that a user with the provided username exists, and that its password matches provided password. */
    async validateCredentials(username: string, password: string): Promise<Account> {
        let account = await this.accountRepo.findOneBy({ username: username })

        if (!account) {
            throw new NotFoundException(`username ${username} doesn't exist`)
        }

        if (account.password !== password) {
            throw new UnauthorizedException(`incorrect username or password`)
        }

        return account
    }

    /** will validate that the user is not logged in */
    async validateNoAuth(session: Session) {
        if (session['authId']) {
            throw new ConflictException(`cannot create a new session because user already has an existing session`)
        }
    }
}
