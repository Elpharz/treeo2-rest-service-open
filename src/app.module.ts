import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { HelloModule } from './hello/hello.modules';
import { LoggerModule } from './logger/logger.module';
import { OrganizationModule } from './organizations/organizations.module';
import { RolesModule } from './roles/roles.module';
import { ProjectsModule } from './projects/projects.module';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { DeviceModule } from './device/device.module';
import { UserProjectsModule } from './user-projects/user-projects.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesPermissionsModule } from './roles-permissions/roles-permissions.module';
import { SmsModule } from './sms/sms.module';
import { OtpModule } from './auth/otp/otp.module';
import { ModulesModule } from './modules/modules.module';
import { PlotModule } from './plot/plot.module';
import { PlannedActivityModule } from './planned-activity/planned-activity.module';
import { ActivitytemplateModule } from './activitytemplate/activitytemplate.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { MeasurementModule } from './measurement/measurement.module';
import { ActivityModule } from './activity/activity.module';
import { PlotProjectsModule } from './plot-projects/plot-projects.module';
import { DEVELOPMENT, TEST, PRODUCTION } from './core/constants';
import { databaseConfig } from './core/database/database.config';
import { PhotosModule } from './photos/photos.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HttpModule } from '@nestjs/axios';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TreeSpeciesModule } from './tree-species/tree-species.module';

dotenv.config();
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => {
        let config;
        switch (process.env.NODE_ENV) {
          case DEVELOPMENT:
            config = databaseConfig.development;
            break;
          case TEST:
            config = databaseConfig.test;
            break;
          case PRODUCTION:
            config = databaseConfig.production;
            break;
          default:
            config = databaseConfig.development;
        }
        return {
          ...config,
          autoLoadModels: true,
          synchronize: true,
          logging: false,
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    EventEmitterModule.forRoot({
      delimiter: '.',
      ignoreErrors: false,
    }),
    UsersModule,
    AuthModule,
    HelloModule,
    LoggerModule,
    OrganizationModule,
    RolesModule,
    ProjectsModule,
    DeviceModule,
    UserProjectsModule,
    PermissionsModule,
    RolesPermissionsModule,
    SmsModule,
    OtpModule,
    ModulesModule,
    PlotModule,
    PlannedActivityModule,
    ActivitytemplateModule,
    QuestionnaireModule,
    MeasurementModule,
    ActivityModule,
    PlotProjectsModule,
    PhotosModule,
    HttpModule,
    TreeSpeciesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
