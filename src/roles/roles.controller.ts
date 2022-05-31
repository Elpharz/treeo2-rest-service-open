import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDTO } from './dto/create-roleDTO';
import { ApiOkResponse } from '@nestjs/swagger';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly roleService: RolesService,
    private readonly permissionCheckService: PermissionCheckService,
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Get all roles' })
  getAllRoles() {
    return this.roleService.findAll();
  }

  @Post()
  @ApiOkResponse({ description: 'Create a role' })
  createRole(@Body() roleData: CreateRoleDTO) {
    return this.roleService.create(roleData);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get a single role using role id as a param' })
  getSingleRole(@Param('id') orgID: string) {
    return this.roleService.findOne(parseInt(orgID));
  }

  // TODO: add auth guard and check role
  // @UseGuards(JwtAuthGuard)
  // @Post('/user/update')
  // @ApiOkResponse({ description: 'Assign a role to a user' })
  // async addRoleToUser(@Body() orgData: AddRoleToUserDTO, @Req() req) {
  //   // const user = await this.userService.getUserInfoWithRole(req.user.email);
  //   // if(user.role.name != "admin") {
  //   //     throw new HttpException('can not logout', HttpStatus.FORBIDDEN);
  //   // }
  //   return this.roleService.addRoleToUser(orgData.roleID, orgData.email);
  // }

  @Get('/organization/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Get roles for an individual organization' })
  async getOrganizationRoles(@Param('id') orgID: string, @Req() req) {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99001,
    );
    if (access) {
      return this.roleService.findRolesByOrganizationId(parseInt(orgID));
    }
    throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
  }
}
