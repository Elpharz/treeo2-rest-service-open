import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApproveUserProjectDTO } from './dto/approveUserProjectDTO';
import { CreateUserProjectDTO } from './dto/create-userProjectDTO';
import { UpdateUserProjectDTO } from './dto/updateUserProjectDTO';
import { UserAssignProjectDTO } from './dto/user-assign-projectDTO';
import { UserProjectsService } from './user-projects.service';

@Controller('user-projects')
export class UserProjectsController {
  constructor(
    private readonly userProjectService: UserProjectsService,
    private readonly permissionCheckService: PermissionCheckService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Get all User Projects' })
  async findAllUserProjects() {
    return this.userProjectService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Create User Project' })
  async createUserProject(@Body() userData: CreateUserProjectDTO) {
    return this.userProjectService.create(userData);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Get single user project' })
  async getUserOnProjectById(@Param('id') userProjectID: string) {
    return this.userProjectService.getUserOnProjectById(
      parseInt(userProjectID),
    );
  }

  @Put('/update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Update User Projects' })
  async updateUserProject(
    @Param('id') userProjectID: string,
    @Body() userProjectUpdateData: UpdateUserProjectDTO,
  ) {
    return this.userProjectService.updateUserProjects(
      parseInt(userProjectID),
      userProjectUpdateData,
    );
  }

  @Get('/delete/:id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Delete User Project' })
  async deleteUserProjectsRole(@Param('id') userProjectID: string) {
    return this.userProjectService.remove(parseInt(userProjectID));
  }

  @Post('/assign/user')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Assign user to project' })
  async userAssignProject(
    @Body() userAssignData: UserAssignProjectDTO,
    @Req() req,
  ) {
    return this.userProjectService.userAssignProject(
      userAssignData,
      req.user.id,
    );
  }

  @Patch('/approve/project/:id')
  @ApiOkResponse({ description: 'Approve user to Project' })
  @UseGuards(JwtAuthGuard)
  async approveUserToProject(
    @Param('id') userProjectID: string,
    @Body() approvalData: ApproveUserProjectDTO,
    @Req() req,
  ) {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99019,
    );
    if (!access) {
      throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
    }
    return this.userProjectService.approveUserToProject(
      approvalData,
      parseInt(userProjectID),
      req.user.id,
    );
  }
}
