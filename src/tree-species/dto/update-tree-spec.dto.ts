import { PartialType } from '@nestjs/swagger';
import { CreateTreeSpecDto } from './create-tree-spec.dto';

export class UpdateTreeSpecDto extends PartialType(CreateTreeSpecDto) {}
