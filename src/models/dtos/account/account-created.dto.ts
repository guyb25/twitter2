import { Expose } from "class-transformer";

export class AccountCreatedDto {
    @Expose()
    id: string
}