import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from 'src/models/entities/account.entity';
import { CreateAccountDto } from 'src/models/dtos/account/create-account.dto';
import { DeleteAccountDto } from 'src/models/dtos/account/delete-account.dto';
import { PatchAccountDto } from 'src/models/dtos/account/patch-account.dto';
import { AccountValidationService } from 'src/validation/account-validation/account-validation.service';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account) private readonly accountRepo: Repository<Account>,
        private readonly accountValidationService: AccountValidationService){}

    async create(dto: CreateAccountDto): Promise<Account> {
        await this.accountValidationService.validateUsernameAvailable(dto.username)
        await this.accountValidationService.validateEmailAvailable(dto.email)
        
        let account = this.accountRepo.create({ username: dto.username, password: dto.password, email: dto.email })
        account = await this.accountRepo.save(account)

        return account
    }

    async delete(dto: DeleteAccountDto): Promise<void> {
        await this.accountValidationService.validateAccountIdExists(dto.id)
        await this.accountRepo.delete({ id: dto.id })
    }

    async request(id: string): Promise<Account> {
        let account = await this.accountRepo.findOneBy({ id: id })

        if (!account) {
            throw new NotFoundException(`account id ${id} not found`)
        }

        return account
    }

    async patch(id: string, dto: PatchAccountDto): Promise<void> {
        await this.accountValidationService.validateAccountIdExists(id)
        
        if (dto.username) {
            await this.accountValidationService.validateUsernameAvailable(dto.username)
        }

        if (dto.email) {
            await this.accountValidationService.validateEmailAvailable(dto.email)
        }

        await this.accountRepo.update({ id: id }, dto)
    }
}
