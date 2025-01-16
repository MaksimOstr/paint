export interface IDrawRequest {
    roomId: string
    figure: {
        x: number,
        y: number,
        type: string,
        color: string
    },
}


export interface IUserJoinReq {
    roomId: string,
    userLogo: string
    username: string
    id: string
}

export interface IUserLeaveReq extends IUserJoinReq {
    id: string
}

export interface ILobbyUser {
    roomId: string
    userLogo: string
    username: string
    isCreator: boolean
}



export interface IFinishDrawing {
    roomId: string
}