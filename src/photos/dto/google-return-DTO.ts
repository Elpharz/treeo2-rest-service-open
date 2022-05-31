import { IsUrl } from 'class-validator';

export class GoogleDTO {
  message: string;

  @IsUrl()
  data: string;
}
