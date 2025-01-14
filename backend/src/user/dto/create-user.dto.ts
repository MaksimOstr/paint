import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateUserDto {

  @ApiProperty({
    format: 'email'
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'Oleg',
    minimum: 3,
  })
  @IsString()
  @MinLength(3)
  username: string

  @ApiProperty({
    example: '1212',
    minLength: 4
  })
  @IsString()
  @MinLength(4)
  password?: string
}
