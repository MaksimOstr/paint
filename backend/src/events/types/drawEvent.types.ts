export interface IDrawRequest {
    roomId: string
    figure: {
        x: number,
        y: number,
        type: string
    }
}


export interface IUserJoinReq {
    roomId: string
    username: string
}