import { PartialType } from '@nestjs/swagger';
import { CreatePlannedActivityDTO } from './create-planned-ActivityDTO';

export class UpdatePlannedActivityDTO extends PartialType(
  CreatePlannedActivityDTO,
) {}
