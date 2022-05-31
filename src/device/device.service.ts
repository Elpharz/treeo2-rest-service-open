import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Device } from './device.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device) private deviceModel: typeof Device,
    private usersService: UsersService,
  ) {}

  async deviceInfo(user: User, data) {
    const { id } = user;
    const userID = await this.usersService.findById(id.toString());
    data.userID = userID.id;
    return Device.create(data);
  }

  async findAllDeviceInfo() {
    return Device.findAndCountAll({
      limit: 10,
      distinct: true,
    });
  }

  async getUserDeviceInformation(userId: number) {
    const device = await this.deviceModel.findAll({
      where: { userID: userId },
      order: [['createdAt', 'DESC']],
      limit: 1,
      include: [],
    });
    if (!device[0]) {
      return null;
    }
    return device[0];
  }

  async findOne(id: string): Promise<Device> {
    const device = await this.deviceModel.findOne({
      where: { id },
      include: [],
    });
    if (!device) {
      throw new NotFoundException('device not found');
    }
    return device;
  }
}
