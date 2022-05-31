import { PartialType } from '@nestjs/swagger';
import { CreatePlotDTO } from './create-plotDTO';

export class UpdatePlotDTO extends PartialType(CreatePlotDTO) {}
