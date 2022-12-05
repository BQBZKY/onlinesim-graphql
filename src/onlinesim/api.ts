import { Injectable } from '@nestjs/common'
import fetch from 'cross-fetch'

import {
  GetFreePhoneListResponse,
  GetFreeCountryListResponse,
  GetFreeMessageListResponse,
  GetFreeMessageListParams,
} from './types'

@Injectable()
export class OnlinesimApi {
  async getFreePhoneList() {
    const response = await fetch('https://onlinesim.ru/api/getFreePhoneList?lang=en')
    const data = await response.json() as GetFreePhoneListResponse

    return data
  }

  async getFreeCountryList() {
    const response = await fetch('https://onlinesim.ru/api/getFreeCountryList?lang=en')
    const data = await response.json() as GetFreeCountryListResponse

    return data
  }

  async getFreeMessageList(
    params: GetFreeMessageListParams
  ) {
    const url = new URL('https://onlinesim.ru/api/getFreeMessageList?lang=en')

    for (const key in params) {
      const value = params[key as keyof typeof params]!.toString()
      url.searchParams.set(key, value)
    }

    const response = await fetch(url)
    const data = await response.json() as GetFreeMessageListResponse

    return data
  }
}
