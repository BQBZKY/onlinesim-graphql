import { ObjectType, ArgsType, Field } from '@nestjs/graphql'

@ObjectType()
export class Sms {
  @Field() from!: string
  @Field() text!: string
  // @Field() code?: string
  @Field() receivedAt!: string
}

@ArgsType()
export class GetFreePhoneNumberMessagesArgs {
  @Field() phoneNumber!: string

  // @Field(() => Int, { nullable: true })
  // cursor?: number

  // @Field(() => Int, { defaultValue: 50 })
  // limit!: number
}

@ObjectType()
export class GetFreePhoneNumberMessagesPayload {
  @Field() phoneNumber!: string
  @Field() activatedAt!: string

  @Field() country!: string

  // TODO countryCode
  // @Field() countryCode!: string

  @Field(() => [Sms])
  messages!:    Sms[]
}
