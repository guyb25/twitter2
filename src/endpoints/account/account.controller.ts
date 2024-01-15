import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from 'src/models/dtos/account/create-account.dto';
import { PatchAccountDto } from 'src/models/dtos/account/patch-account.dto';
import { AccountCreatedDto } from 'src/models/dtos/account/account-created.dto';
import { AccountDto } from 'src/models/dtos/account/account.dto';
import { AccountService } from './account.service';
import { AuthSession } from 'src/models/session/auth-session';
import { AuthGuard } from 'src/guards/auth-guard/auth.guard';

@Controller('account')
@ApiTags('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'creates a new account and returns the ID of the created user.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'account created successfully' })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'username/email taken' })
    async create(@Body() dto: CreateAccountDto): Promise<AccountCreatedDto> {
        return await this.accountService.create(dto)
    }

    @Get('request/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'requests the information about an existing account.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'return the information about the account'})
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'account not found' })
    async request(@Param('id', new ParseUUIDPipe()) id: string): Promise<AccountDto> {
        return await this.accountService.request(id)
    }

    @Patch('patch')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'updates information about the currently logged in account.' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'the account was updated successfully' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'the account was not found' })
    async update(@Session() session: AuthSession, @Body() dto: PatchAccountDto) {
        await this.accountService.update(session.accountId, dto)
    }

    @Delete('/delete')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'deletes currently logged in account and logs out. '})
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'the account was deleted successfully'})
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'the account was not found' })
    async delete(@Session() session: AuthSession) {
        await this.accountService.delete(session)
    }
}