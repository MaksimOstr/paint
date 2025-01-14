import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { $Enums, Role, User } from "@prisma/client";


export class CreateUserSwaggerResponse implements Omit<User, 'password' | 'authMethod' | 'profileLogo'> {

    @ApiProperty({
        format: 'uuid'
    })
    id: string;

    @ApiProperty({
        format: 'email'
    })
    email: string;

    @ApiProperty({
        example: 'Oleg'
    })
    username: string;

    
    @ApiProperty({ enum: Role, isArray: true, default: ['USER'] })
    role: $Enums.Role[]
}