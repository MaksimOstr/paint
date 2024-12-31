export interface IUserAuth {
    username: string
    password: string
}


export interface AuthRequest {
    access_token: string
}

export interface IUser {
    id: string
    username: string
    role: Array<string>
    profileLogo: string | null
}
