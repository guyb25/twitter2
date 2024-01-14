import { Injectable } from '@nestjs/common';
import { SessionService } from 'src/data/session/session.service';
import { LoginDto } from 'src/models/dtos/auth/login.dto';
import { AccountValidationService } from 'src/validation/account-validation/account-validation.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly sessionService: SessionService, 
        private readonly validationService: AccountValidationService) {}

    async login(dto: LoginDto) {
        let account = await this.validationService.validateLogin(dto.username, dto.password)
        this.sessionService.createSession(account.id)
    }

    async 
}
