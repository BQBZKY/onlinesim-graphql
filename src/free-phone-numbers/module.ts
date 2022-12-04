import { Module } from '@nestjs/common'
import { FreePhoneNumbersGraphQL } from './graphql'
import { OnlinesimApi } from 'onlinesim/api'

@Module({
  providers: [FreePhoneNumbersGraphQL, OnlinesimApi]
})
export class FreePhoneNumbersModule {}
