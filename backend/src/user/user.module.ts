import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { AwsS3Module } from "src/awsS3/awsS3.module";

@Module({
    imports: [PrismaModule, AwsS3Module],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule {}