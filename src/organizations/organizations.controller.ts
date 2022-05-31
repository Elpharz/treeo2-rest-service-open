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
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { CreateOrganizationDTO } from './dto/create-organizationDTO';
import { UpdateUserOrganizationDTO } from './dto/update-user-organizationDTO';
import { OrganizationService } from './organizations.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly orgService: OrganizationService,
    private readonly permissionCheckService: PermissionCheckService,
  ) {}

  @Post()
  @ApiOkResponse({ description: 'create an organization' })
  createOrganization(@Body() orgData: CreateOrganizationDTO) {
    return this.orgService.create(orgData);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllOrganizations(@Req() req) {
    const access = await this.permissionCheckService.checkPermission(
      req,
      99002,
    );
    if (access) {
      return this.orgService.findAll();
    }
    throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get details of an organization using id' })
  getSingleOrganization(@Param('id') orgID: string) {
    return this.orgService.findOne(parseInt(orgID));
  }

  @Post('/user/update')
  @ApiOkResponse({ description: 'Add a user  to an organisation' })
  addOrganizationToUser(@Body() orgData: UpdateUserOrganizationDTO) {
    return this.orgService.addOrganizationToUser(
      orgData.orgName,
      orgData.email,
    );
  }
}
