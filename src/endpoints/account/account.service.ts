import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from 'src/models/entities/account.entity';
import { CreateAccountDto } from 'src/models/dtos/account/create-account.dto';
import { PatchAccountDto as UpdateAccountDto } from 'src/models/dtos/account/patch-account.dto';
import { AccountValidationService } from 'src/providers/validation/account-validation.service';
import { AccountDto } from 'src/models/dtos/account/account.dto';
import { DtoSerializerService } from 'src/providers/dto-serializer/dto-serializer.service';
import { AccountCreatedDto } from 'src/models/dtos/account/account-created.dto';
import { AuthSession } from 'src/models/session/auth-session';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account) private readonly accountRepo: Repository<Account>,
        private readonly accountValidationService: AccountValidationService,
        private readonly dtoSerializer: DtoSerializerService){}

    
    async create(dto: CreateAccountDto): Promise<AccountDto> {
        await this.accountValidationService.validateUsernameAvailable(dto.username)
        await this.accountValidationService.validateEmailAvailable(dto.email)
        
        let account = this.accountRepo.create({ username: dto.username, password: dto.password, email: dto.email })
        account = await this.accountRepo.save(account)

        return this.dtoSerializer.serialize(AccountCreatedDto, account)
    }

    async request(id: string): Promise<AccountDto> {
        let account = await this.accountRepo.findOneBy({ id: id })

        if (!account) {
            throw new NotFoundException(`account id ${id} not found`)
        }

        return this.dtoSerializer.serialize(AccountDto, account)
    }

    async update(id: string, dto: UpdateAccountDto): Promise<void> {
        await this.accountValidationService.validateAccountIdExists(id)
        
        if (dto.username) {
            await this.accountValidationService.validateUsernameAvailable(dto.username)
        }

        if (dto.email) {
            await this.accountValidationService.validateEmailAvailable(dto.email)
        }

        await this.accountRepo.update({ id: id }, dto)
    }

    async delete(session: AuthSession): Promise<void> {
        await this.accountValidationService.validateAccountIdExists(session.accountId)
        await this.accountRepo.delete({ id: session.accountId })
        session.destroy((err) => {
            console.log(err)
        })
    }
}
