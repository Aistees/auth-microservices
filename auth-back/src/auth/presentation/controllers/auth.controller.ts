import { Body, Controller, Post, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// Use Cases
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token.use-case';
import { ValidateTokenUseCase } from '../../application/use-cases/validate-token.use-case';
import { RegisterUseCases } from 'src/auth/application/use-cases/register.use-case';

// Commands & Queries
import { LoginCommand } from '../../application/commands/login.command';
import { RefreshTokenCommand } from '../../application/commands/refresh-token.command';
import { ValidateTokenQuery } from '../../application/queries/validate-token.query';

// DTOs
import { LoginRequestDto } from '../dtos/login.request.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { ValidateTokenDto } from '../dtos/validate-token.dto';
import { RegisterRequestDto } from '../dtos/register.request.dto';
import { RegisterCommand } from 'src/auth/application/commands/register.command';
import { RegisterResponseDto } from 'src/auth/application/dtos/register-response.dto';

@ApiTags('api')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshUseCase: RefreshTokenUseCase,
    private readonly validateUseCase: ValidateTokenUseCase,
    private readonly registerUseCase: RegisterUseCases,
  ) { }

  @Post('account')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user and return tokens' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() body: LoginRequestDto): Promise<AuthResponseDto> {
    const command = new LoginCommand(body.login, body.password);

    return this.loginUseCase.execute(command);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Register user in database' })
  @ApiResponse({ status: 201, description: "User created" })
  async register(@Body() body: RegisterRequestDto): Promise<RegisterResponseDto> {
    const command = new RegisterCommand(body.login, body.password, body.roles, body.status)
    return this.registerUseCase.execute(command);
  }


  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate new tokens using a Refresh Token' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  async refresh(@Body() body: RefreshTokenDto): Promise<AuthResponseDto> {
    const command = new RefreshTokenCommand(body.refreshToken);
    return this.refreshUseCase.execute(command);
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify if an access token is valid' })
  @ApiResponse({ status: 200, description: 'Token is valid' })
  @ApiResponse({ status: 401, description: 'Token is invalid or expired' })
  async validate(@Body() body: ValidateTokenDto): Promise<any> {
    const query = new ValidateTokenQuery(body.token);
    return this.validateUseCase.execute(query);
  }
}
