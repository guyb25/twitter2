import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsOptional } from "class-validator";

export class PatchAccountDto {
    @IsOptional()
    @IsString()
    @ApiProperty()
    username: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    password: string

    @IsOptional()
    @IsEmail()
    @ApiProperty({ example: "joe@example.com" })
    email: string
}