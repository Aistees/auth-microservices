import { ApiProperty } from "@nestjs/swagger";

export class AccessTokenDto {
    @ApiProperty({description: 'JWT Access token'})
    accessToken: string;
}