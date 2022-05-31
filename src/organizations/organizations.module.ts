import { forwardRef, Module } from '@nestjs/common';
import { OrganizationService } from './organizations.service';
import { OrganizationController } from './organizations.controller';
import { Organization } from './organizations.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';
import { OrganizationsResolver } from './organizations.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    SequelizeModule.forFeature([Organization]),
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
    EventEmitterModule.forRoot({
      delimiter: '.',
      ignoreErrors: false,
    }),
  ],
  providers: [
    OrganizationService,
    OrganizationsResolver,
    PermissionCheckService,
  ],
  controllers: [OrganizationController],
  exports: [OrganizationService, SequelizeModule],
})
export class OrganizationModule {}
