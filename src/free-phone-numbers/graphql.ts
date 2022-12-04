import { Resolver as GraphQL, Query } from '@nestjs/graphql'
import { OnlinesimApi } from 'onlinesim/api'

import {
  FreePhoneNumberGroup,
} from './schema'

@GraphQL()
export class FreePhoneNumbersGraphQL {
  constructor(
    private readonly onlinesimApi: OnlinesimApi
  ) {}

  @Query(() => [FreePhoneNumberGroup])
  async getFreePhoneNumbers() {
    const [data1, data2] = await Promise.all([
      this.onlinesimApi.getFreeCountryList(),
      this.onlinesimApi.getFreePhoneList(),
    ])

    return data1!.countries.map(({
      country:  c1,
      country_text: country,
    }) => ({
      country,
      phoneNumbers: data2!.numbers
        .filter(({ country: c2 }) => c1 === c2)
        .map(({ full_number, maxdate }) => ({
          phoneNumber: full_number,
          activatedAt: maxdate,
        }))
    }))
  }
}
