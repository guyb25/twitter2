import { Body, Controller, HttpCode, HttpStatus, Post, Session, UseGuards } from '@nestjs/common';
import { LoginDto } from 'src/models/dtos/auth/login.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Session as ExpressSession } from 'express-session';
import { AuthGuard } from 'src/guards/auth-guard/auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'creates a session for the user' })
    async login(@Body() dto: LoginDto, @Session() session: ExpressSession) {
        await this.authService.login(dto, session)
    }

    @Post('/logout')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'deletes a user session' })
    async logout(@Session() session: ExpressSession) {
        await this.authService.logout(session)
    }
}
