import { IsUUID } from 'class-validator';

export class UploadImageDTO {
  @IsUUID()
  readonly measurementId: string;
}
