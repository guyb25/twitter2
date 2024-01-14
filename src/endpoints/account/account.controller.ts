import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from 'src/models/dtos/account/create-account.dto';
import { DeleteAccountDto } from 'src/models/dtos/account/delete-account.dto';
import { PatchAccountDto } from 'src/models/dtos/account/patch-account.dto';
import { AccountCreatedDto } from 'src/models/dtos/account/account-created.dto';
import { AccountDto } from 'src/models/dtos/account/account.dto';
import { Account } from 'src/models/entities/account.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AccountService } from './account.service';

@Controller('account')
@ApiTags('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    @Serialize(AccountCreatedDto)
    @ApiOperation({ summary: 'creates a new account and returns the ID of the created user.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'account created successfully' })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'username/email taken' })
    async create(@Body() dto: CreateAccountDto): Promise<Account> {
        return await this.accountService.create(dto)
    }

    @Get('request/:id')
    @HttpCode(HttpStatus.OK)
    @Serialize(AccountDto)
    @ApiOperation({ summary: 'requests the information about an existing account.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'return the information about the account'})
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'account not found' })
    async request(@Param('id', new ParseUUIDPipe()) id: string): Promise<Account> {
        return await this.accountService.request(id)
    }

    @Patch('patch/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'updates information within an existing account.' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'the account was updated successfully' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'the account was not found' })
    async patch(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: PatchAccountDto) {
        await this.accountService.patch(id, dto)
    }

    @Delete('/delete')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'deletes an existing account. '})
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'the account was deleted successfully'})
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'the account was not found' })
    async delete(@Body() dto: DeleteAccountDto) {
        await this.accountService.delete(dto)
    }
}
