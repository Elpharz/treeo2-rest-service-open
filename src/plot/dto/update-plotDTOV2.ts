import { PartialType } from '@nestjs/swagger';
import { CreatePlotDTOV2 } from './create-plotDTO';

export class UpdatePlotDTOV2 extends PartialType(CreatePlotDTOV2) {}
