import { IsArray, IsDate, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterRequestDto {
    @ApiProperty({ example: "string", description: "The user login" })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    login: string;

    @ApiProperty({ example: "string", description: "The user password" })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({ 
        example: '[ "string" ]',
        description: "role of the user" })
    @IsArray()
    roles: string[] = ["ROLE_USER"];

    @ApiProperty({ example: "status", description: "status of the user account" })
    @IsString()
    status: string = "open";
}
