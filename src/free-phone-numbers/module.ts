import { Module } from '@nestjs/common'

import { OriginApi } from '_/origin-api'
import { CountriesNormalizer } from '_/countries-normalizer'

import { FreePhoneNumbersGraphQL } from './graphql'
import { FreePhoneNumbersFetcher } from './fetcher'

@Module({
  providers: [
    OriginApi,
    CountriesNormalizer,
    FreePhoneNumbersGraphQL,
    FreePhoneNumbersFetcher
  ]
})
export class FreePhoneNumbersModule {}
