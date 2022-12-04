import { Injectable } from '@nestjs/common'
import fetch from 'cross-fetch'

@Injectable()
export class OnlinesimApi {
  async getFreePhoneList() {
    try {
      const response = await fetch('https://onlinesim.ru/api/getFreePhoneList?lang=en')
      const data = await response.json() as {
        numbers: {
          full_number: string
          maxdate: string
          country: number
        }[]
      }

      return data
    } catch (e) {}
  }

  async getFreeCountryList() {
    try {
      const response = await fetch('https://onlinesim.ru/api/getFreeCountryList?lang=en')
      const data = await response.json() as {
        countries: {
          country: number
          country_text: string
        }[]
      }

      return data
    } catch (e) {}
  }
}
