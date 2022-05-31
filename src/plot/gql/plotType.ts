import { User } from './../../auth/interfaces/google.service.interface';
import { UserType } from './../../users/gql/userType';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OrganizationType } from '../../organizations/gql/organizationType';
import { Organization } from '../../organizations/organizations.model';
import { DataType } from 'sequelize-typescript';
import JSON from 'graphql-type-json';

@ObjectType()
export class PlotType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  projectStatus?: string;

  @Field(() => Int, { nullable: false })
  organizationID?: number;

  @Field(() => OrganizationType, { nullable: false })
  organization?: Organization;

  @Field(() => Int, { nullable: true })
  area: number;

  @Field()
  externalId: string;

  @Field(() => JSON, { nullable: true })
  polygon: any;

  @Field(() => UserType)
  ownerID: number;

  @Field(() => UserType)
  owner: User;
}
