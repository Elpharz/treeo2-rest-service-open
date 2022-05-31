import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { PlotProject } from '../plot-projects/plot-projects.model';
import { User } from '../users/users.model';
import { CreatePlotDTO, CreatePlotDTOV2 } from './dto/create-plotDTO';
import { Plot } from './plot.model';
import sequelize from 'sequelize';
import { Project } from '../projects/projects.model';
import { Organization } from '../organizations/organizations.model';

@Injectable()
export class PlotService {
  constructor(@InjectModel(Plot) private plotModel: typeof Plot) {}

  async findOne(id: number): Promise<Plot> {
    const Plot = await this.plotModel.findOne({
      where: { id },
      attributes: { exclude: ['userID', 'projectID'] },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'preferedLogin',
              'refreshToken',
              'password',
              'isActive',
              'isGdprCompliant',
              'preferences',
            ],
          },
        },
        {
          model: PlotProject,
          include: [{ model: Project, include: [{ model: Organization }] }],
        },
      ],
    });
    if (!Plot) {
      throw new NotFoundException('Plot not found');
    }
    return Plot;
  }

  async createPlot(plot: CreatePlotDTO | CreatePlotDTOV2) {
    const isExternalExist = await this.findByExternalId(
      plot.externalId ? plot.externalId : null,
    );
    if (isExternalExist && isExternalExist.externalId != null) {
      throw new HttpException('externalId already exists', HttpStatus.CONFLICT);
    }

    const polygon = {
      type: 'Polygon',
      coordinates: plot.polygon,
      crs: { type: 'name', properties: { name: 'EPSG:4326' } },
    };

    plot.polygon = polygon;
    plot.externalId = plot.externalId ? plot.externalId : null;
    plot.ownerID = plot.ownerID ? plot.ownerID : null;

    try {
      const result = await this.plotModel.create(plot);
      return {
        data: { externalId: result.externalId, id: result.id },
        message: 'plot created',
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'can not create plot',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async createPoint(plot: CreatePlotDTO, loggedInUser: number) {
    const isExternalExist = await this.findByExternalId(
      plot.externalId ? plot.externalId : null,
    );
    if (isExternalExist && isExternalExist.externalId != null) {
      throw new HttpException('externalId already exists', HttpStatus.CONFLICT);
    }

    const point = {
      type: 'Point',
      coordinates: plot.point,
      crs: { type: 'name', properties: { name: 'EPSG:4326' } },
    };
    try {
      const result = await this.plotModel.create({
        area: null,
        externalId: plot.externalId ? plot.externalId : null,
        polygon: point,
        ownerID: loggedInUser,
      });
      return {
        data: { externalId: result.externalId, id: result.id },
        message: 'point created',
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'can not create point',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async findByExternalId(id: string) {
    const plot = await this.plotModel.findOne({
      where: { externalId: id },
      attributes: {
        exclude: ['userID', 'projectID', 'ownerID', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'preferedLogin',
              'refreshToken',
              'password',
              'isActive',
              'isGdprCompliant',
              'preferences',
              'id',
            ],
          },
        },
      ],
    });
    if (!plot) {
      return null;
    }
    return plot;
  }

  async getAllPlotsForUser(loggedInUser: number) {
    const plots = await this.plotModel.findAndCountAll({
      where: { ownerID: loggedInUser },
      distinct: true,
      attributes: {
        exclude: ['userID', 'projectID', 'ownerID', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'preferedLogin',
              'refreshToken',
              'password',
              'isActive',
              'isGdprCompliant',
              'preferences',
              'id',
            ],
          },
        },
      ],
    });
    if (!plots) {
      throw new NotFoundException('user has no plot information');
    }
    return plots;
  }

  async getAllPlotPoints() {
    const plots = await this.plotModel.findAndCountAll({
      distinct: true,
      attributes: {
        exclude: ['userID', 'projectID', 'ownerID', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'preferedLogin',
              'refreshToken',
              'password',
              'isActive',
              'isGdprCompliant',
              'preferences',
              'id',
            ],
          },
        },
      ],
    });
    if (!plots) {
      throw new NotFoundException('no plot information found');
    }
    return plots;
  }

  async remove(id: number): Promise<void> {
    const plot = await this.findOne(id);
    await plot.destroy();
  }

  filterPlotData(data: any, filterPlotData: string) {
    const result = data.rows.filter((item) => {
      if (filterPlotData === 'assigned') {
        return item.plotProject.length !== 0;
      }
      if (filterPlotData === 'unAssigned') {
        return item.plotProject.length === 0;
      }
    });
    const res = {
      count: result.length,
      rows: result,
    };
    return res;
  }

  async getAllPlotProjectsData(queryData: any, permissionType: string) {
    try {
      const plots = await this.plotModel.findAndCountAll({
        distinct: true,
        attributes: {
          exclude: ['userID', 'projectID', 'ownerID', 'createdAt', 'updatedAt'],
        },
        where: sequelize.literal(
          `ST_DWithin(ST_Transform(polygon, 3857),ST_Transform('SRID=4326;POINT( ${parseFloat(
            queryData.lng,
          )} ${parseFloat(queryData.lat)})'::geometry, 3857),1000*${parseFloat(
            queryData.distance,
          )})`,
        ),
        include: [
          { model: PlotProject },
          {
            model: User,
            attributes: {
              exclude: [
                'createdAt',
                'updatedAt',
                'preferedLogin',
                'refreshToken',
                'password',
                'isActive',
                'isGdprCompliant',
                'preferences',
                'id',
              ],
            },
          },
        ],
      });
      if (!plots) {
        throw new NotFoundException('no plot information found');
      }
      if (permissionType === 'assignedAndUnAssigned') {
        return plots;
      }
      return this.filterPlotData(plots, permissionType);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async filterPlots(plotProjectFilterData: any, permissionType: string) {
    try {
      if (
        permissionType === 'unAssigned' &&
        plotProjectFilterData.organizationId &&
        plotProjectFilterData.projectId
      ) {
        throw new HttpException(
          'Cannot filter by organizations or projects for un assigned plots',
          HttpStatus.NOT_FOUND,
        );
      }
      if (
        permissionType === 'unAssigned' &&
        plotProjectFilterData.organizationId
      ) {
        throw new HttpException(
          'Cannot filter by organizations for un assigned plots',
          HttpStatus.NOT_FOUND,
        );
      }
      if (permissionType === 'unAssigned' && plotProjectFilterData.projectId) {
        throw new HttpException(
          'Cannot filter by projects for un assigned plots',
          HttpStatus.NOT_FOUND,
        );
      }
      const plots = await this.plotModel.findAndCountAll({
        distinct: true,
        attributes: {
          exclude: ['userID', 'projectID', 'ownerID', 'createdAt', 'updatedAt'],
        },
        where: this.plotQuery(
          plotProjectFilterData.status,
          plotProjectFilterData.externalId,
        ),
        include: [
          {
            model: PlotProject,
            include: [
              {
                model: Project,
                where: this.projectOrganizationQuery(
                  plotProjectFilterData.organizationId,
                  plotProjectFilterData.projectId,
                ),
                include: [
                  {
                    model: Organization,
                  },
                ],
              },
            ],
          },
          {
            model: User,
            where: this.usersQuery(plotProjectFilterData.nameKeyword),
            attributes: {
              exclude: [
                'createdAt',
                'updatedAt',
                'preferedLogin',
                'refreshToken',
                'password',
                'isActive',
                'isGdprCompliant',
                'preferences',
                'id',
              ],
            },
          },
        ],
      });
      if (!plots) {
        throw new NotFoundException('no plot information found');
      }
      if (permissionType === 'assignedAndUnAssigned') {
        return plots;
      }
      return this.filterPlotData(plots, permissionType);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  plotQuery(status: string, externalId: string) {
    if (status && ['active', 'deleted'].includes(status) && externalId) {
      return {
        status: status,
        externalId: externalId,
      };
    }
    if (status && ['active', 'deleted'].includes(status) && !externalId) {
      return {
        status: status,
      };
    }

    if (!status && externalId) {
      return {
        externalId: externalId,
      };
    }

    return {};
  }

  projectQuery(projectId: number) {
    if (projectId) {
      return {
        projectID: projectId,
      };
    }
    return {};
  }

  projectOrganizationQuery(organizationId: number, projectId: number) {
    if (organizationId && !projectId) {
      return {
        organizationID: organizationId,
      };
    }
    if (!organizationId && projectId) {
      return {
        id: projectId,
      };
    }
    if (organizationId && projectId) {
      return {
        id: projectId,
        organizationID: organizationId,
      };
    }
    return {};
  }

  usersQuery(nameKeyword: string) {
    if (nameKeyword) {
      return {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${nameKeyword}%` } },
          { lastName: { [Op.iLike]: `%${nameKeyword}%` } },
          { email: { [Op.iLike]: `%${nameKeyword}%` } },
        ],
      };
    }
    return {};
  }

  async update(plotID: number, plotData: any) {
    const plot = await this.findOne(plotID);
    if (!plot) {
      throw new NotFoundException('plot not found');
    }

    try {
      if (plotData.polygon) {
        const polygon = {
          type: 'Polygon',
          coordinates: plotData.polygon,
          crs: { type: 'name', properties: { name: 'EPSG:4326' } },
        };
        plotData.polygon = polygon;
      }

      const result = await this.plotModel.update(
        { ...plotData },
        {
          where: { id: plotID },
          returning: true,
        },
      );
      return {
        data: result[1],
        message: 'plot updated',
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'not able to update',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async singlePlot(id: number, permissionType: string) {
    const plot = await this.findOne(id);
    if (permissionType === 'assignedAndUnAssigned') {
      return plot;
    }
    const data = {
      count: 1,
      rows: [plot],
    };

    const result = this.filterPlotData(data, permissionType);

    if (result.count === 0) {
      throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
    } else {
      return result.rows[0];
    }
  }
}
