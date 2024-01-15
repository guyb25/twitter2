import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/models/dtos/auth/login.dto';
import { AuthValidationService } from 'src/providers/validation/auth-validation.service';
import { randomUUID } from 'crypto';
import { AuthSession } from 'src/models/session/auth-session';

@Injectable()
export class AuthService {
    constructor(private readonly validationService: AuthValidationService) {}

    async login(dto: LoginDto, session: AuthSession) {
        await this.validationService.validateNoAuth(session)
        let account = await this.validationService.validateCredentials(dto.username, dto.password)
        session.authId = randomUUID()
        session.accountId = account.id
    }

    async logout(session: AuthSession) {
        session.destroy(err => { 
            if (err) {
                console.log(err)
            }
        })
    }
}
