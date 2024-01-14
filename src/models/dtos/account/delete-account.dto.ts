import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class DeleteAccountDto {
    @IsUUID('4')
    @ApiProperty()
    id: string
}