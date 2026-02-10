
import { IsArray, IsDate, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
    @ApiProperty({ example: "mylogin", description: "The user login" })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    login: string;

    @ApiProperty({ example: "mypassword", description: "The user password" })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({ example: "[\\nrole\\n]", description: "role of the user" })
    @IsArray()
    roles: string[] = ["ROLE_USER"];

    @ApiProperty({ example: "status", description: "status of the user account" })
    @IsString()
    status: string = "open";

    @ApiProperty({ example: "created at", description: "user created at" })
    @IsDate()
    @IsNotEmpty()
    createdAt: Date;

    @ApiProperty({ example: "updated at", description: "user update at" })
    @IsDate()
    @IsNotEmpty()
    updatedAt: Date;
}
