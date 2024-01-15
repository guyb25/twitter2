import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from 'src/models/entities/account.entity';

@Injectable()
export class AccountValidationService {
    constructor(@InjectRepository(Account) private readonly accountRepo: Repository<Account>) {}

    /** will validate that a username is available */
    async validateUsernameAvailable(username: string) {
        if (!username) {
            throw new BadRequestException(`username not provided`)
        }
        
        if (await this.accountRepo.existsBy({ username: username })) {
            throw new ConflictException(`username ${username} is already taken`)
        }
    }

    /** will validate that an email is available */
    async validateEmailAvailable(email: string) {
        if (!email) {
            throw new BadRequestException(`email not provided`)
        }

        if (await this.accountRepo.existsBy({ email : email})) {
            throw new ConflictException(`email ${email} is already taken`)
        }
    }

    /** will validate that an account with the given id exists */
    async validateAccountIdExists(id: string) {
        if (!id) {
            throw new BadRequestException(`account id not provided`)
        }

        if (!await this.accountRepo.existsBy({ id: id })) {
            throw new NotFoundException(`account id ${id} not found`)
        }
    }
}
