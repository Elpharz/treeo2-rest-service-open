import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
  Put,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-userDTO';
import { UsersService } from './users.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';
import { CreateMobileUserDTO } from './dto/create-userMobileDTO';
import { UpdateUserDTO } from './dto/update-userDTO';
import { ResetPasswordDTO } from './dto/reset-passwordDTO';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly permissionCheckService: PermissionCheckService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Get all Users' })
  async getAllUsers(@Req() req) {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99001,
    );
    if (access) {
      return this.userService.findAll();
    }
    throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
  }

  @Get('/userId/:id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Get a single user by ID' })
  @ApiUnauthorizedResponse()
  @UseGuards(JwtAuthGuard)
  getSingleUSer(@Param('id') userID: string) {
    return this.userService.findOne(parseInt(userID));
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  createUser(@Body() userData: CreateUserDTO) {
    return this.userService.createUser(userData, 'local');
  }

  @Post('/mobile/register')
  @ApiCreatedResponse({
    description: 'Mobile user has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  createMobileUser(@Body() userData: CreateMobileUserDTO) {
    return this.userService.createUser(userData, 'mobile');
  }

  @Post('/search')
  @ApiOkResponse({ description: 'Search user by email' })
  @HttpCode(200)
  async getByEmail(@Body('email') userEmail: string) {
    const user = await this.userService.findByEmailLocal(userEmail);
    user.password = null;
    return user;
  }

  @Get('/confirm/:id')
  @ApiOkResponse({ description: 'Confirm user by email' })
  confirmUserFromEmail(@Param('id') userID: string) {
    return this.userService.confirmUserFromEmail(userID);
  }

  @Get('/delete/:id')
  @ApiOkResponse({ description: 'Delete User' })
  deleteUser(@Param('id') userID: string) {
    return this.userService.remove(parseInt(userID));
  }

  @ApiOkResponse({ description: 'view user information' })
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async findProfile(@Param('id') userId: string): Promise<any> {
    const userInfo = await this.userService.findById(userId);
    if (!userInfo) {
      throw new NotFoundException('user not found');
    }
    return {
      data: userInfo,
      message: 'Profile information viewed successfully',
    };
  }

  @Post('/password/update/:email')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async updateUserPassword(
    @Param('email') userEmail: string,
    @Body() passwordResetData: ResetPasswordDTO,
  ) {
    return this.userService.updateUserPassword(userEmail, passwordResetData);
  }

  @Get('/password/reset/:email')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Reset user password' })
  async resetUserPassword(@Param('email') userEmail: string, @Req() req) {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99013,
    );
    if (access) {
      return this.userService.resetUserPassword(userEmail);
    }
    throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
  }

  @Get('/questionnaire/planned-activity')
  @UseGuards(JwtAuthGuard)
  async getPlannedActivity(@Req() req) {
    return this.userService.getPlannedActivity(req.user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update user' })
  @ApiUnauthorizedResponse()
  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') userId: string,
    @Body()
    userData: UpdateUserDTO,
    @Req() req,
  ): Promise<any> {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99011,
    );
    if (access) {
      const profile = await this.userService.findById(userId);
      if (!profile) {
        throw new NotFoundException('user not found');
      }
      const user = await this.userService.updateUser(userId, userData);
      return {
        data: user,
        message: 'user information edited successfully',
      };
    }
    throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
  }
}
