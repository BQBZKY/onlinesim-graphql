import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

import { FreePhoneNumbersModule } from 'free-phone-numbers/module'
import { FreePhoneNumberMessagesModule } from 'free-phone-number-messages/module'
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),

    FreePhoneNumbersModule,
    FreePhoneNumberMessagesModule,
  ],
})
export class MainModule {}
