import { Module } from '@nestjs/common'

import { OriginApi } from '_/origin-api'
import { CountriesNormalizer } from '_/countries-normalizer'

import { FreePhoneNumberMessagesGraphQL } from './graphql'
import { FreePhoneNumberMessagesFetcher } from './fetcher'

@Module({
  providers: [
    OriginApi,
    CountriesNormalizer,
    FreePhoneNumberMessagesGraphQL,
    FreePhoneNumberMessagesFetcher,
  ]
})
export class FreePhoneNumberMessagesModule {}
