import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class CreateAccountDto {
    @IsString()
    @ApiProperty()
    username: string

    @IsString()
    @ApiProperty()
    password: string

    @IsEmail()
    @ApiProperty({ default: "joe@example.com" })
    email: string
}