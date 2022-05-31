import { User } from './../../auth/interfaces/google.service.interface';
import { UserType } from './../../users/gql/userType';
import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
export class DeviceType {
  @Field()
  id: number;

  @Field()
  manufacturer: string;

  @Field()
  model: string;

  @Field()
  androidVersion: string;

  @Field()
  totalRAM: string;

  @Field()
  freeRAM: string;

  @Field()
  totalInternalStorage: string;

  @Field({ nullable: true })
  totalCardStorage: string;

  @Field({ nullable: true })
  sensors: string;

  @Field({ nullable: true })
  installedApps: string;

  @Field({ nullable: true })
  advertisingID: string;

  @Field({ nullable: true })
  screenResolution: string;

  @Field({ nullable: true })
  cameraInformation: string;

  @Field(() => UserType)
  users: User;

  @Field(() => UserType)
  userID: number;
}
