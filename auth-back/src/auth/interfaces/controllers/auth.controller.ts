import { Body, Controller, Post, Get, HttpCode, HttpStatus, UnauthorizedException, Param, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

// Use Cases
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token.use-case';
import { ValidateTokenUseCase } from '../../application/use-cases/validate-token.use-case';
import { RegisterUseCases } from 'src/auth/application/use-cases/register.use-case';
import { GetUserUseCase } from 'src/auth/application/use-cases/get-user.use-case';
import { GenerateAccessTokenUseCase } from 'src/auth/application/use-cases/generate-access-tokens.use-case';
import { UpdateUserUseCase } from 'src/auth/application/use-cases/update-user.use-case';

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
import { GetUserQuery } from 'src/auth/application/queries/get-user.query';
import { UpdateCommand } from 'src/auth/application/commands/update.command';
import { UpdateUserDto } from '../dtos/update.request.dto';
import { GetUser } from 'src/shared/get-user.decorator';
import { DebugJwtAuthGuard } from '../guards/debug-jwt.guard';
import { RefreshtokenResponseDto } from '../dtos/refresh-token.response.dto';


@ApiTags('api')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly validateUseCase: ValidateTokenUseCase,
    private readonly registerUseCase: RegisterUseCases,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUseruseCase: UpdateUserUseCase,
    private readonly generateAccessTokenUseCase: GenerateAccessTokenUseCase
  ) { }

  @Post('account')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user and return tokens' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({ description: 'You need an admin account to create one' })
  @ApiUnprocessableEntityResponse({description:'Token might be missing or is incorrecté'})
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

  @Get('register/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: "User found" })
  async getById(@Param('id') id: string): Promise<RegisterResponseDto> {
    const query = new GetUserQuery(id);
    return this.getUserUseCase.execute(query);
  }

  @Put('update/:id')
  @ApiBearerAuth('JwtAuthGuard')
  @UseGuards(JwtAuthGuard)
  @UseGuards(DebugJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a user profile by id"})
  @ApiResponse({ status: 200, description:"UserUpdated"})
  async upddateById(@Param('id') targetId: string, @Body() body: UpdateUserDto, @GetUser('id') requester: string): Promise<RegisterResponseDto> {
    console.log(requester)
    const command = new UpdateCommand(
      targetId,
      body,
      requester
  );

  return this.updateUseruseCase.execute(command);
  }


  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate new tokens using a Refresh Token' })
  @ApiResponse({ status: 200, type: RefreshtokenResponseDto })
  async refresh(@Body() body: RefreshTokenDto): Promise<RefreshtokenResponseDto> {
    const command = new RefreshTokenCommand(body.refreshToken);
    return this.generateAccessTokenUseCase.execute(command.refreshToken);
  }

  @Post('validate/:token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify if an access token is valid' })
  @ApiResponse({ status: 200, description: 'Token is valid' })
  @ApiResponse({ status: 401, description: 'Token is invalid or expired' })
  async validate(@Param('token') token: string): Promise<ValidateTokenDto> {
    const query = new ValidateTokenQuery(token);
    return this.validateUseCase.execute(query);
  }
}
