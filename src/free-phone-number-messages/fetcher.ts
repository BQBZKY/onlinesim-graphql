import { Injectable } from '@nestjs/common'

import { range } from 'lodash'
import { findIndex } from 'utils/find-index'

import { OnlinesimApi } from 'onlinesim/api'

import {
  GetFreeMessageListResponse,
  GetFreeMessageListParams,
} from 'onlinesim/types'

import {
  type Sms as Message,
  type GetFreePhoneNumberMessagesArgs as Args,
  type GetFreePhoneNumberMessagesPayload as Payload,
} from './schema'

@Injectable()
export class FreePhoneNumberMessagesFetcher {
  constructor(
    private readonly onlinesimApi: OnlinesimApi
  ) {}

  async fetch(
    { phoneNumber, cursor, limit = 50 }: Args
  ) {
    const messages = []

    const foundPhoneItem = await this.onlinesimApi.getFreePhoneList()
      .then(
        data => data!.numbers.find(
          item => item.full_number === phoneNumber
        )!
      )

    // if (!foundPhoneItem) {
    //   throw new PhoneNumberNotFoundException()
    // }
    // TODO: PhoneNumberNotFoundException

    const params: GetFreeMessageListParams = {
      country: foundPhoneItem.country,
      phone: foundPhoneItem.number,
    }

    const firstPageData = await this.onlinesimApi.getFreeMessageList(params)

    const { total, perPage } = this.parsePageInfo(firstPageData!)

    let start = 0
    let end = limit

    if (cursor) {
      start = total - cursor
      end = start + limit

      if (end > total) {
        end = total
      }
    }

    const pages = range(
      Math.ceil((start + 1) / perPage),
      Math.ceil((end + 1) / perPage),
    )

    if (pages.at(0) === 1) {
      pages.shift()

      const firstPageMessages = this.parsePageMessages(firstPageData)
      messages.push(...firstPageMessages)
    }

    const pagesData = await Promise.all(
      pages.map(
        page => this.onlinesimApi.getFreeMessageList({ ...params, page })
      )
    )

    const moreMessages = pagesData
      .map((data) => this.parsePageMessages(data))
      .flat()

    messages.push(...moreMessages)

    return <Payload> {
      messages,

      phoneNumber,
      activatedAt: foundPhoneItem.maxdate,
    }
  }

  private parsePageInfo(data: GetFreeMessageListResponse) {
    return {
      total: data.messages.total,
      offset: data.messages.from - 1,
      perPage: data.messages.per_page,
    }
  }

  private parsePageMessages(data: GetFreeMessageListResponse) {
    const { total, offset } = this.parsePageInfo(data)

    let id = total - offset

    return data.messages.data.map(({
      text,
      in_number:        from,
      created_at: receivedAt,
    }) => ({
      id: id--,
      from,
      text: text.replace(/received from onlinesim.ru/i, '').trim(),
      receivedAt,
    }))
  }
}
