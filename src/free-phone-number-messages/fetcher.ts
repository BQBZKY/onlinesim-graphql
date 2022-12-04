import { Injectable } from '@nestjs/common'
import { OnlinesimApi } from 'onlinesim/api'

import {
  GetFreeMessageListResponse,
  GetFreeMessageListParams,
} from 'onlinesim/types'

import {
  GetFreePhoneNumberMessagesArgs,
} from './schema'

@Injectable()
export class FreePhoneNumberMessagesFetcher {
  constructor(
    private readonly onlinesimApi: OnlinesimApi
  ) {}

  async fetch(
    { phoneNumber }: GetFreePhoneNumberMessagesArgs
  ) {
    const [getPhoneListResponse, getCountryListResponse] = await Promise.all([
      this.onlinesimApi.getFreePhoneList(),
      this.onlinesimApi.getFreeCountryList(),
    ])

    const matchedPhoneItem = getPhoneListResponse!.numbers.find(
      ({ full_number }) => full_number === phoneNumber
    )!

    // if (!matchedPhoneItem) {
    //   throw new PhoneNumberNotFoundException()
    // }
    // TODO: PhoneNumberNotFoundException

    const { country, number, maxdate } = matchedPhoneItem
    const params: GetFreeMessageListParams = {
      country,
      phone: number,
    }

    const data = await this.onlinesimApi.getFreeMessageList(params)
    const messages = this.parseMessages(data!)

    const matchedCountryItem = getCountryListResponse!.countries.find(
      item => item.country === country
    )!
    const { country_text } = matchedCountryItem

    return {
      phoneNumber,
      activatedAt: maxdate,
      country: country_text,

      messages
    }
  }

  private parseMessages(data: GetFreeMessageListResponse) {
    return data!.messages.data.map(({
      text,
      in_number:        from,
      created_at: receivedAt,
    }) => ({
      from,
      text: text.replace(/received from onlinesim.ru/i, '').trim(),
      receivedAt,
    }))
  }
}
