import { Module } from '@nestjs/common'
import { OnlinesimApi } from 'onlinesim/api'

import { FreePhoneNumberMessagesGraphQL } from './graphql'
import { FreePhoneNumberMessagesFetcher } from './fetcher'

@Module({
  providers: [
    OnlinesimApi,
    FreePhoneNumberMessagesGraphQL,
    FreePhoneNumberMessagesFetcher,
  ]
})
export class FreePhoneNumberMessagesModule {}
