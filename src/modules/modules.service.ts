import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Permission } from '../permissions/permissions.model';
import { TModule } from './modules.model';

@Injectable()
export class ModulesService {
  constructor(@InjectModel(TModule) private modulesModel: typeof TModule) {}

  async findAll(): Promise<TModule[]> {
    return this.modulesModel.findAll({
      limit: 30,
      include: [{ model: Permission, attributes: { exclude: ['moduleID'] } }],
    });
  }
}
