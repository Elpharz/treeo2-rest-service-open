import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class PermissionCheckService {
  constructor(private usersService: UsersService) {}

  async checkPermission(req: any, code: number) {
    const user = await this.usersService.findOne(req.user.id);

    for (let i = 0; i < user.userProject.length; i++) {
      for (let j = 0; j < user.userProject[i].role.permissions.length; j++) {
        if (user.userProject[i].role.permissions[j].code === code) {
          return true;
        }
      }
    }
    return false;
  }
}
