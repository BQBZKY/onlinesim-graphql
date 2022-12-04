import { Resolver as GraphQL, Query } from '@nestjs/graphql'
import { OnlinesimApi } from 'onlinesim/api'

import {
  FreePhoneNumberItem,
} from './schema'

@GraphQL()
export class FreePhoneNumbersGraphQL {
  constructor(
    private readonly onlinesimApi: OnlinesimApi
  ) {}

  @Query(() => [FreePhoneNumberItem])
  async getFreePhoneNumbers() {
    const data = await this.onlinesimApi.getFreePhoneList()

    return data!.numbers.map(({
      full_number,
      maxdate,
    }) => ({
      phoneNumber: full_number,
      activatedAt: maxdate,
    }))
  }
}
