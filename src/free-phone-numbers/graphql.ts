import { Resolver as GraphQL, Query } from '@nestjs/graphql'
import { FreePhoneNumbersFetcher } from './fetcher'
import { FreePhoneNumberGroup } from './schema'

@GraphQL()
export class FreePhoneNumbersGraphQL {
  constructor(
    private readonly fetcher: FreePhoneNumbersFetcher
  ) {}

  @Query(() => [FreePhoneNumberGroup])
  async getFreePhoneNumbers() {
    return this.fetcher.fetch()
  }
}
