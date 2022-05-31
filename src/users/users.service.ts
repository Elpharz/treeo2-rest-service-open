import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Transform } from 'class-transformer';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
// import * as crypto from 'crypto';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { sendEmail } from '../mailer/sendMail';
import { confirmEmailLink } from '../mailer/confirmEmail';
import { redis } from '../mailer/redis';
import { LoggerService } from '../logger/logger.service';
import { logger } from '../logger/logger';
import { Organization } from '../organizations/organizations.model';
import { Role } from '../roles/roles.model';
import { CreateUserDTO } from './dto/create-userDTO';
import { Project } from '../projects/projects.model';
import { Permission } from '../permissions/permissions.model';
import { SmsService } from '../sms/sms.service';
import { CreateMobileUserDTO } from './dto/create-userMobileDTO';
import { UserProject } from '../user-projects/user-project.model';
import { ResetPasswordDTO } from './dto/reset-passwordDTO';
import { PlannedActivity } from '../planned-activity/planned-activity.model';
import { ActivityTemplate } from '../activitytemplate/activitytemplate.model';
import { Plot } from '../plot/plot.model';
import { Questionnaire } from '../questionnaire/questionnaire.model';
import { faker as Faker } from '@faker-js/faker';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private loggerService: LoggerService,
    private smsService: SmsService,
  ) {}

  logger: Logger = new Logger(UsersService.name);

  async findAll(): Promise<any> {
    return this.userModel.findAndCountAll({
      distinct: true,
      attributes: {
        exclude: ['password', 'refreshToken', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: UserProject,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'projectID',
              'roleID',
              'userID',
            ],
          },
          include: [
            {
              model: Role,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'organizationID'],
              },
              include: [
                {
                  model: Organization,
                  attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
              ],
            },
            {
              model: Project,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'organizationID'],
              },
              include: [
                {
                  model: Organization,
                  attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
              ],
            },
          ],
        },
      ],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findOne({
      where: { id },
      attributes: { exclude: ['password', 'refreshToken'] },
      include: [
        {
          model: UserProject,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'projectID',
              'roleID',
              'userID',
            ],
          },
          include: [
            {
              model: Role,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'organizationID'],
              },
              include: [
                {
                  model: Organization,
                  attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
                {
                  model: Permission,
                  attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
              ],
            },
            {
              model: Project,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'organizationID'],
              },
              include: [
                {
                  model: Organization,
                  attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
              ],
            },
          ],
        },
        {
          model: PlannedActivity,
          include: [
            {
              model: ActivityTemplate,
            },
          ],
        },
      ],
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async createUser(
    userData: CreateUserDTO | CreateMobileUserDTO,
    authType: string,
  ): Promise<any> {
    // try {
    //   await userSchema.validate(userData);
    // } catch (e) {
    //   throw new HttpException(e['message'], HttpStatus.BAD_REQUEST);
    // }

    if (authType != 'mobile') {
      const email = userData.email;
      const checkEmail = await this.userModel.findOne({ where: { email } });
      if (checkEmail) {
        throw new HttpException('email already exixts', HttpStatus.CONFLICT);
      }
    }

    if (userData.phoneNumber) {
      const countryCode = this.containsCountryCode(userData.phoneNumber);
      if (!countryCode)
        throw new HttpException(
          'phone number does not include country code',
          HttpStatus.BAD_REQUEST,
        );
      userData.phoneNumber = userData.phoneNumber.replace('+', '').trim();
      const valid = this.checkValidNumber(userData.phoneNumber);
      if (!valid)
        throw new HttpException('invalid phone number', HttpStatus.BAD_REQUEST);
    }

    const saltOrRounds = parseInt(process.env.SALT_ROUNDS);
    const hash = await bcrypt.hash(userData.password, saltOrRounds);
    userData.password = hash;

    userData.phoneNumber =
      userData.phoneNumber == undefined ? null : userData.phoneNumber;
    const userPhoneNumber = await this.userModel.findOne({
      where: { phoneNumber: userData.phoneNumber },
      attributes: {
        exclude: [
          'password',
          'preferedLogin',
          'refreshToken',
          'organizationID',
          'roleID',
        ],
      },
    });

    if (userPhoneNumber && userPhoneNumber.phoneNumber != null) {
      this.logger.warn(
        `phone number already exists ${userPhoneNumber.phoneNumber}`,
      );
      throw new HttpException(
        'phone number already exists',
        HttpStatus.CONFLICT,
      );
    }
    userData.username =
      userData.username == undefined
        ? this.generateUsername(userData.firstName, userData.lastName)
        : userData.username;

    const username = await this.userModel.findOne({
      where: { username: userData.username },
      attributes: {
        exclude: [
          'password',
          'preferedLogin',
          'refreshToken',
          'organizationID',
          'roleID',
        ],
      },
    });

    if (username && username.username != null) {
      this.logger.warn(`username already exists => ${username.username}`);
      throw new HttpException('username already exists', HttpStatus.CONFLICT);
    }

    // generate OTP, send via sms and validate in redis
    if (authType === 'mobile') {
      userData.preferedLogin = 'mobile';
      userData.email = userData.email == undefined ? null : userData.email;
      const otpCode = this.generateFourDigitCode();
      await this.smsService.sendOTPWithTwilio(
        '+' + userData.phoneNumber,
        otpCode,
      );
    }

    if (userData.phoneNumber) {
      userData.phoneNumber = userData.phoneNumber.replace('+', '').trim();
    }

    const user = await this.userModel.create(userData);
    const retUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isActive: user.isActive,
      id: user.id,
    };

    // send email after verification
    if (authType === 'local') {
      await sendEmail(
        retUser.email,
        await confirmEmailLink(retUser.email),
        'registration',
      );
    }
    return retUser;
  }

  async findByEmailLocal(email: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('user with email not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }

  async findByPayload(payload) {
    const { username } = payload;
    return this.userModel.findOne({ where: { username } });
  }

  async confirmUserFromEmail(searchKey: any) {
    const userEmail = await redis.get(searchKey);
    if (userEmail) {
      try {
        await this.updateUserStatusByEmail(userEmail);
        return { userEmail: true };
      } catch (e) {
        return { e };
      }
    }
    throw new HttpException(
      'can not validate user email',
      HttpStatus.NOT_FOUND,
    );
  }

  async confirmUserFromPhoneNumber(phone: any, code: any) {
    const otpCode = await redis.get(phone);
    if (otpCode == code) {
      try {
        await this.updateUserStatusByPhoneNumber(phone);
        return await this.findByPhoneNumber(phone);
      } catch (e) {
        throw new HttpException('user is already active', HttpStatus.CONFLICT);
      }
    }
    throw new HttpException('invalid OTP code', HttpStatus.NOT_FOUND);
  }

  async updateUserStatusByEmail(email: string): Promise<any> {
    const user = await this.findByEmail(email);
    if (user.isActive) {
      throw new HttpException('user already active', HttpStatus.CONFLICT);
    }
    try {
      const result = await this.userModel.update(
        { isActive: true, status: 'active' },
        { where: { email } },
      );
      return result;
    } catch (e) {
      throw new HttpException(
        'can not update on email',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUserStatusByPhoneNumber(phoneNumber: string): Promise<any> {
    const user = await this.findByPhoneNumber(phoneNumber);
    if (!user) {
      return new NotFoundException('phone number not found');
    }
    if (user.isActive) {
      throw new HttpException('user already active', HttpStatus.CONFLICT);
    }
    try {
      const result = await this.userModel.update(
        { isActive: true, status: 'active' },
        { where: { phoneNumber } },
      );
      return result;
    } catch (e) {
      throw new HttpException(
        'can not update on phoneNumber',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: { phoneNumber },
      attributes: {
        exclude: ['password', 'organizationID', 'roleID', 'refreshToken'],
      },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async CheckOrCreateUserUsingFacebookProfile(profile): Promise<User> {
    const { email } = profile;
    const user = await this.findByEmail(email);
    if (user) {
      return user;
    }
    profile.preferedLogin = 'facebook';
    profile.isActive = true;
    profile.status = 'active';
    const createdUser = await this.userModel.create(profile);
    return createdUser;
  }

  async logoutUser(request: any): Promise<any> {
    try {
      this.createLogs(request, 'success', null);
      this.loggerService.createLog('logout', request, 'success', null);
      return {
        message: 'logged out',
        status: HttpStatus.OK,
      };
    } catch (error) {
      this.createLogs(request, 'failure', error);
      this.loggerService.createLog('logout', request, 'failure', error);
      throw new HttpException('can not logout', HttpStatus.BAD_REQUEST);
    }
  }

  createLogs = (request: any, status: any, error: any) => {
    const logData = `logout, ${request.headers.host}, ${request.method}, ${
      request.url
    }, ${request.headers.token}, ${status} ${error === null ? '' : error}`;
    return logger.log('info', `${logData}`);
  };

  async setCurrentRefreshToken(refreshToken: string, email: string) {
    const saltOrRounds = parseInt(process.env.SALT_ROUNDS);
    const currentHashedRefreshToken = await bcrypt.hash(
      refreshToken,
      saltOrRounds,
    );
    await this.userModel.update(
      {
        refreshToken: currentHashedRefreshToken,
      },
      { where: { email } },
    );
  }

  async setCurrentRefreshTokenMobile(
    refreshToken: string,
    phoneNumber: string,
  ) {
    const saltOrRounds = parseInt(process.env.SALT_ROUNDS);
    const currentHashedRefreshToken = await bcrypt.hash(
      refreshToken,
      saltOrRounds,
    );
    await this.userModel.update(
      {
        refreshToken: currentHashedRefreshToken,
      },
      { where: { phoneNumber } },
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
    const user = await this.loginStatus(id.toString());
    if (!user.refreshToken) {
      throw new NotFoundException('user is logged out');
    }

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (isRefreshTokenMatching) {
      return { username: user.username, email: user.email };
    }
    return;
  }

  async removeRefreshToken(id: string) {
    const res = await this.userModel.update(
      {
        refreshToken: null,
      },
      { where: { id } },
    );
    return true;
  }

  async findByUserPhoneNumber(userPhoneNumber: string) {
    const phoneNumber = await this.userModel.findOne({
      where: { phoneNumber: userPhoneNumber },
      attributes: {
        exclude: [
          'password',
          'preferedLogin',
          'refreshToken',
          'organizationID',
          'roleID',
        ],
      },
    });
    if (!phoneNumber) {
      throw new NotFoundException('phoneNumber not found');
    }
    return {
      data: {
        phoneNumber: userPhoneNumber,
        valid: true,
        errorStatus: 'None',
      },
      message: 'phone number found',
    };
  }

  async findById(id: string): Promise<any> {
    return this.userModel.findOne({
      where: { id },
      attributes: {
        exclude: ['password', 'preferedLogin', 'refreshToken'],
      },
    });
  }

  async loginStatus(id: string): Promise<any> {
    return this.userModel.findOne({
      where: { id },
      attributes: {
        exclude: ['password', 'preferedLogin'],
      },
    });
  }

  async updateUser(id: string, userData: any): Promise<any> {
    if (userData.phoneNumber) {
      const startWithPlus = this.containsCountryCode(userData.phoneNumber);
      if (!startWithPlus)
        throw new HttpException('invalid phone number', HttpStatus.BAD_REQUEST);
      const phoneNum = this.removePlus(userData.phoneNumber);
      const checkPhone = this.checkValidNumber(phoneNum);

      const parsed = parsePhoneNumberFromString(userData.phoneNumber);

      if (!parsed)
        throw new HttpException('invalid phone number', HttpStatus.BAD_REQUEST);

      if (!checkPhone) {
        throw new HttpException(
          'Phone number should be a string of digits',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        userData.phoneNumber = phoneNum;
      }
    }

    await this.userModel.update(
      { ...userData },
      { where: { id }, returning: true },
    );
    return this.findById(id);
  }

  async updateUserPassword(userEmail: string, passwordReset: ResetPasswordDTO) {
    if (passwordReset.password1 !== passwordReset.password2) {
      throw new HttpException('passwords do not match', HttpStatus.CONFLICT);
    }

    await this.findByEmailLocal(userEmail);

    const hash = await bcrypt.hash(
      passwordReset.password1,
      parseInt(process.env.SALT_ROUNDS),
    );
    try {
      const result = await this.userModel.update(
        { password: hash },
        { where: { email: userEmail } },
      );
      return {
        data: { rowsAffected: result[0] },
        message: 'user password has been updated',
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'not able to update password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async resetUserPassword(userEmail: string) {
    await this.findByEmailLocal(userEmail);
    const resetPassword = Faker.internet.password();
    const hash = await bcrypt.hash(
      resetPassword,
      parseInt(process.env.SALT_ROUNDS),
    );
    try {
      const result = await this.userModel.update(
        { password: hash },
        { where: { email: userEmail } },
      );

      // send email with reset password
      await sendEmail(userEmail, resetPassword, 'passwordReset');
      return {
        data: { rowsAffected: result[0] },
        message: 'user password has been reset',
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'not able to reset password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getPlannedActivity(id: number) {
    const user = await this.userModel.findOne({
      where: { id },
      attributes: {
        exclude: [
          'password',
          'refreshToken',
          'preferedLogin',
          'isGdprCompliant',
          'preferences',
          'isActive',
          'createdAt',
          'updatedAt',
          'id',
        ],
      },
      include: [
        {
          model: PlannedActivity,
          attributes: { exclude: ['userID', 'plotID', 'activityTemplateID'] },
          include: [
            {
              model: ActivityTemplate,
              attributes: { exclude: ['createdAt', 'updatedAt'] },
              include: [
                {
                  model: Questionnaire,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt', 'answers'],
                  },
                },
              ],
            },
            {
              model: Plot,
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
          ],
        },
      ],
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  checkValidNumber(phoneNumber: string): boolean {
    const pattern = /^\d+$/;
    return pattern.test(phoneNumber);
  }

  containsCountryCode(phoneNumber: string): boolean {
    if (phoneNumber == null)
      throw new HttpException('invalid phone number', HttpStatus.BAD_REQUEST);
    return phoneNumber.startsWith('+');
  }

  removePlus(phoneNumber: string): string {
    return phoneNumber.replace('+', '');
  }

  generateUsername(firstName: string, lastName: string): string {
    return `${firstName}.${lastName}` + this.generateFourDigitCode();
  }

  generateFourDigitCode() {
    // return cryptos.randomInt(0, 1000000);
    return (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  }

  async filterUserOrganization(
    firstName?: string,
    lastName?: string,
    email?: string,
    status?: string,
  ) {
    const result = await this.userModel.findAndCountAll({
      attributes: {
        exclude: ['projectID', 'userID', 'roleID', 'password', 'refreshToken'],
      },
      distinct: true,
      where: this.generateUserQuery(firstName, lastName, email, status),
      include: [
        {
          model: UserProject,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'projectID',
              'roleID',
              'userID',
            ],
          },
          include: [
            {
              model: Role,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'organizationID'],
              },
              include: [
                {
                  model: Organization,
                  attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
              ],
            },
            {
              model: Project,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'organizationID'],
              },
            },
          ],
        },
      ],
    });
    return result;
  }

  organizeData = (data) => {
    const users = [];
    const usersIds = [];
    const result = data.map((item) => {
      if (!usersIds.includes(item.dataValues.id)) {
        users.push(item);
        usersIds.push(item.dataValues.id);
      }
      return;
    });
    return users;
  };

  generateUserQuery = (
    firstName?: string,
    lastName?: string,
    email?: string,
    status?: string,
  ) => {
    //None
    if (!firstName && !lastName && !email && !status) {
      return {};
    }
    //One
    if (firstName && !lastName && !email && !status) {
      return {
        firstName: { [Op.iLike]: `%${firstName}%` },
      };
    }
    if (!firstName && lastName && !email && !status) {
      return {
        lastName: { [Op.iLike]: `%${lastName}%` },
      };
    }
    if (!firstName && !lastName && email && !status) {
      return {
        email: { [Op.iLike]: `%${email}%` },
      };
    }
    if (!firstName && !lastName && !email && status) {
      return {
        status: status,
      };
    }
    //two first name .....
    if (firstName && lastName && !email && !status) {
      return {
        firstName: { [Op.iLike]: `%${firstName}%` },
        lastName: { [Op.iLike]: `%${lastName}%` },
      };
    }
    if (firstName && !lastName && email && !status) {
      return {
        firstName: { [Op.iLike]: `%${firstName}%` },
        email: { [Op.iLike]: `%${email}%` },
      };
    }
    if (firstName && !lastName && !email && status) {
      return {
        firstName: { [Op.iLike]: `%${firstName}%` },
        status: status,
      };
    }
    //two last name .....
    if (!firstName && lastName && email && !status) {
      return {
        lastName: { [Op.iLike]: `%${lastName}%` },
        email: { [Op.iLike]: `%${email}%` },
      };
    }
    if (!firstName && lastName && !email && status) {
      return {
        lastName: { [Op.iLike]: `%${lastName}%` },
        status: status,
      };
    }
    //two email .....
    if (!firstName && !lastName && email && status) {
      return {
        status: status,
        email: { [Op.iLike]: `%${email}%` },
      };
    }
    //three firstName .....
    if (firstName && lastName && email && !status) {
      return {
        firstName: { [Op.iLike]: `%${firstName}%` },
        lastName: { [Op.iLike]: `%${lastName}%` },
        email: { [Op.iLike]: `%${email}%` },
      };
    }
    //three firstName .....
    if (firstName && lastName && !email && status) {
      return {
        firstName: { [Op.iLike]: `%${firstName}%` },
        lastName: { [Op.iLike]: `%${lastName}%` },
        status: status,
      };
    }
    //three firstName .....
    if (firstName && !lastName && email && status) {
      return {
        firstName: { [Op.iLike]: `%${firstName}%` },
        email: { [Op.iLike]: `%${email}%` },
        status: status,
      };
    }
    //three lastName .....
    if (!firstName && lastName && email && status) {
      return {
        lastName: { [Op.iLike]: `%${lastName}%` },
        email: { [Op.iLike]: `%${email}%` },
        status: status,
      };
    }
    //All Four .....
    if (firstName && lastName && email && status) {
      return {
        firstName: { [Op.iLike]: `%${firstName}%` },
        lastName: { [Op.iLike]: `%${lastName}%` },
        email: { [Op.iLike]: `%${email}%` },
        status: status,
      };
    }
  };

  //Search Users
  async searchUsers(key: any) {
    return this.userModel.findAndCountAll({
      attributes: {
        exclude: ['projectID', 'userID', 'roleID', 'password', 'refreshToken'],
      },
      distinct: true,
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${key}%` } },
          { lastName: { [Op.iLike]: `%${key}%` } },
          { email: { [Op.iLike]: `%${key}%` } },
        ],
      },
      include: [
        {
          model: UserProject,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'projectID',
              'roleID',
              'userID',
            ],
          },
          include: [
            {
              model: Role,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'organizationID'],
              },
              include: [
                {
                  model: Organization,
                  attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
              ],
            },
            {
              model: Project,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'organizationID'],
              },
            },
          ],
        },
      ],
    });
  }
}
