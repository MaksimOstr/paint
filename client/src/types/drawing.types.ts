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
}

export interface IWebSocketDrawingRes {
    id: string,
    figure: IFigure
}