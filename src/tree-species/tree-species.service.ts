import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { CreateTreeSpecDto } from './dto/create-tree-spec.dto';
import { UpdateTreeSpecDto } from './dto/update-tree-spec.dto';
import { TreeSpecies } from './tree-species.model';

@Injectable()
export class TreeSpeciesService {
  logger: Logger = new Logger(TreeSpeciesService.name);
  constructor(
    @InjectModel(TreeSpecies) private treeSpecies: typeof TreeSpecies,
  ) {}

  async create(treeSpeciesData: CreateTreeSpecDto) {
    try {
      const data = this.removeWhiteSpace(treeSpeciesData);
      const result = await this.treeSpecies.create(data);
      return {
        id: result.id,
        isActive: result.isActive,
        code: result.code,
        version: result.version,
      };
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        'not able to create tree species',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  findAll() {
    return this.treeSpecies.findAndCountAll({
      distinct: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'modifiedById'],
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'password',
              'isActive',
              'preferedLogin',
              'refreshToken',
              'gdprAccepted',
              'preferences',
              'status',
              'username',
            ],
          },
        },
      ],
    });
  }

  async findOne(id: number): Promise<TreeSpecies> {
    const species = await this.treeSpecies.findOne({
      where: { id },
      include: [],
    });
    if (!species) {
      throw new NotFoundException('species not found');
    }
    return species;
  }

  async update(treeSpeciesID: number, updateData: UpdateTreeSpecDto) {
    await this.findOne(treeSpeciesID);
    try {
      const result = await this.treeSpecies.update(
        { ...updateData },
        { where: { id: treeSpeciesID }, returning: true },
      );
      return {
        data: result[1],
        message: 'tree species updated',
      };
    } catch (e) {
      this.logger.error(`${e}`);
      throw new HttpException(
        'not able to update',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async remove(id: number) {
    const treeSpecies = await this.findOne(id);
    await treeSpecies.destroy();
  }

  removeWhiteSpace(treeSpeciesData: CreateTreeSpecDto) {
    treeSpeciesData.code = treeSpeciesData.code.trim();
    treeSpeciesData.latinName = treeSpeciesData.latinName.trim();
    treeSpeciesData.matureAge = treeSpeciesData.matureAge.trim();
    treeSpeciesData.iconURL = treeSpeciesData.iconURL.trim();
    treeSpeciesData.agbBiomassFormula =
      treeSpeciesData.agbBiomassFormula.trim();
    treeSpeciesData.agbCo2Formula = treeSpeciesData.agbCo2Formula.trim();
    return treeSpeciesData;
  }
}
