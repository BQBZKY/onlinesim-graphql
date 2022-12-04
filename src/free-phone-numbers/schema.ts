import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class FreePhoneNumberItem {
  @Field() phoneNumber!: string;
  @Field() activatedAt!: string;
}
