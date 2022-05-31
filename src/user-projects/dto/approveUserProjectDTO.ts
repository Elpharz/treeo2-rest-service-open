import { PartialType } from '@nestjs/swagger';
import { UpdateUserProjectDTO } from './updateUserProjectDTO';

export class ApproveUserProjectDTO extends PartialType(UpdateUserProjectDTO) {}
