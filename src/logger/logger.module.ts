import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Log } from './logs.model';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { JwtStrategy } from './../auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

@Module({
  imports: [
    SequelizeModule.forFeature([Log]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [LoggerService, JwtStrategy],
  exports: [SequelizeModule, LoggerService],
  controllers: [LoggerController],
})
export class LoggerModule {}
