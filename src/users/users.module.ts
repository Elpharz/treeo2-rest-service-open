import { jwtConstants } from './../auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { Device } from '../device/device.model';
import { UsersService } from './users.service';
import { LoggerService } from './../logger/logger.service';
import { LoggerModule } from './../logger/logger.module';
import { OrganizationModule } from '../organizations/organizations.module';
import { UsersResolver } from './users.resolver';
import { PassportModule } from '@nestjs/passport';
import { PermissionCheckService } from '../auth/permisssions/checkPermissions';
import { SmsService } from '../sms/sms.service';
import { OtpService } from '../auth/otp/otp.service';
import { ProjectsModule } from '../projects/projects.module';
import { PlotModule } from '../plot/plot.module';
import { ActivitytemplateModule } from '../activitytemplate/activitytemplate.module';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
@Module({
  imports: [
    SequelizeModule.forFeature([User, Device]),
    forwardRef(() => OrganizationModule),
    LoggerModule,
    forwardRef(() => ProjectsModule),
    forwardRef(() => PlotModule),
    ActivitytemplateModule,
    passportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    UsersService,
    LoggerService,
    UsersResolver,
    PermissionCheckService,
    SmsService,
    OtpService,
  ],
  controllers: [UsersController],
  exports: [UsersService, SequelizeModule],
})
export class UsersModule {}
