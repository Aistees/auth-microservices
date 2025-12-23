import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterRequestDto {
    @ApiProperty({example: "mylogin", description: "The user login"})
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    login: string;

    @ApiProperty({example: "mypassword", description: "The user password"})
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({example: "role", description:"role of the user"})
    @IsString()
    roles: string[] = ["ROLE_USER"]; 
    
    @ApiProperty({example: "status", description:"status of the user account"})
    @IsString()
    status: string = "open";
}