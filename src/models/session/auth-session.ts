import { Session } from "express-session";

export interface AuthSession extends Session {
    authId?: string
    accountId?: string
}