import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from 'src/models/entities/account.entity';

@Injectable()
export class AccountValidationService {
    constructor(@InjectRepository(Account) private readonly accountRepo: Repository<Account>) {}

    async validateUsernameAvailable(username: string) {
        if (await this.accountRepo.existsBy({ username: username })) {
            throw new ConflictException(`username ${username} is already taken`)
        }
    }

    async validateEmailAvailable(email: string) {
        if (await this.accountRepo.existsBy({ email : email})) {
            throw new ConflictException(`email ${email} is already taken`)
        }
    }

    async validateAccountIdExists(id: string) {
        if (!await this.accountRepo.existsBy({ id: id })) {
            throw new NotFoundException(`account id ${id} not found`)
        }
    }

    async validateLogin(username: string, password: string): Promise<Account> {
        let account = await this.accountRepo.findOneBy({ username: username })

        if (!account) {
            throw new NotFoundException(`username ${username} doesn't exist`)
        }

        if (account.password !== password) {
            throw new UnauthorizedException(`incorrect username or password`)
        }

        return account
    }
}
