import { PermissionCheckService } from './../auth/permisssions/checkPermissions';
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';
import { RolesResolver } from './roles.resolver';
import { OrganizationModule } from '../organizations/organizations.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

@Module({
  imports: [
    SequelizeModule.forFeature([Role]),
    UsersModule,
    OrganizationModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [RolesService, JwtStrategy, RolesResolver, PermissionCheckService],
  controllers: [RolesController],
  exports: [RolesService, SequelizeModule],
})
export class RolesModule {}
