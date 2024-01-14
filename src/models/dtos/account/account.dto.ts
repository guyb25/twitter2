import { Expose } from "class-transformer";

export class AccountDto {
    @Expose()
    id: string

    @Expose()
    username: string

    @Expose()
    email: string
}