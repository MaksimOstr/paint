import { RefreshToken } from "@prisma/client"

export interface Tokens {
    refresh_token: {
        token: RefreshToken['token']
        expiresAt: RefreshToken['expiresAt']
    }
    access_token: string
}