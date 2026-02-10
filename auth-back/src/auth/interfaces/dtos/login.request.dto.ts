import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginRequestDto {
    @ApiProperty({ example: "mylogin", description: "User login"})
    @IsString()
    login: string;

    @ApiProperty({ example: "mypassword", description: "User password"})
    @IsString()
    password: string;
}