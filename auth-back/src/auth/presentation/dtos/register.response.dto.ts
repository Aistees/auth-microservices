import { IsArray, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterResponseDto {
    @ApiProperty({ example: "mylogin", description: "The user login" })
    @IsString()
    login: string;

    @ApiProperty({ example: "mypassword", description: "The user password" })
    @IsString()
    password: string;

    @ApiProperty({ example: "role", description: "role of the user" })
    @IsArray()
    roles: string[] = ["ROLE_USER"];

    @ApiProperty({ example: "status", description: "status of the user account" })
    @IsString()
    status: string = "open";
}
