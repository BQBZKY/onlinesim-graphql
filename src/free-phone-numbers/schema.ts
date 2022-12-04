import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class FreePhoneNumberItem {
  @Field() phoneNumber!: string;
  @Field() activatedAt!: string;
}

@ObjectType()
export class FreePhoneNumberGroup {
  @Field() country!: string
  // @Field() countryCode!: string // TODO

  @Field(() =>  [FreePhoneNumberItem])
  phoneNumbers!: FreePhoneNumberItem[]
}
