export interface ISaveDrawing {
    title: string
    imageData: string
}

export interface IDrawing {
    id: string
    title: string
    imageData: string
    authorId: string
}

export interface IFigure {
    type: string
    x: number
    y: number
    sideLength: number,
    lineWidth: number,
    color: string
    width: number
    height: number
    endX: number
    endY: number
    finish: boolean
    r: number
}

export interface IWebSocketDrawingRes {
    id: string,
    figure: IFigure
}

export interface ISaveLobbyCanvas {
    formData: FormData
    roomId: string
}