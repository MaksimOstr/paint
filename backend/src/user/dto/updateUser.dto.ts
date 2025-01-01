import { IsObject, IsOptional, isString, IsString, IsUrl, MinLength, ValidateIf } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  username: string


  @ValidateIf((object) => object.profileLogo !== null)
  @IsUrl()
  profileLogo: string
}
