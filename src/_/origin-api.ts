import { Injectable } from '@nestjs/common'
import fetch from 'cross-fetch'

@Injectable()
export class OriginApi {
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

export type GetFreePhoneListResponse = {
  numbers: {
    full_number: string
    number: string
    maxdate: string
    country: number
  }[]
}

export type GetFreeCountryListResponse = {
  countries: {
    country: number
    country_text: string
  }[]
}

export type GetFreeMessageListResponse = {
  messages: {
    from: number
    // to: number
    total: number

    per_page: number
    // current_page: number
    // last_page: number
    data: {
      text: string
      in_number: string
      created_at: string
    }[]
  }
}

export type GetFreeMessageListParams = {
  country: number
  phone: string
  page?: number
}
