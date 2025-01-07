import { IsNotEmpty, IsString } from "class-validator"

export class CreateDrawingDto {

    @IsString()
    @IsNotEmpty()
    title: string

    imageData: string
}