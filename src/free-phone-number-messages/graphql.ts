import { Resolver as GraphQL, Query, Args } from '@nestjs/graphql'

import { FreePhoneNumberMessagesFetcher } from './fetcher'

import {
  GetFreePhoneNumberMessagesArgs,
  GetFreePhoneNumberMessagesPayload,
} from './schema'

@GraphQL()
export class FreePhoneNumberMessagesGraphQL {
  constructor(
    private readonly fetcher: FreePhoneNumberMessagesFetcher,
  ) {}

  @Query(() => GetFreePhoneNumberMessagesPayload)
  async getFreePhoneNumberMessages(
    @Args() args: GetFreePhoneNumberMessagesArgs
  ) {
    return this.fetcher.fetch(args)
  }
}
