import { Injectable } from '@nestjs/common'

import { OriginApi } from '_/origin-api'
import { CountriesNormalizer } from '_/countries-normalizer'

@Injectable()
export class FreePhoneNumbersFetcher {
  constructor(
    private readonly originApi: OriginApi,
    private readonly countriesNormalizer: CountriesNormalizer,
  ) {}

  async fetch() {
    const [data1, data2] = await Promise.all([
      this.originApi.getFreeCountryList(),
      this.originApi.getFreePhoneList(),
    ])

    return data1!.countries.map(({
      country:  c1,
      country_text: country,
    }) => ({
      country,
      countryCode: this.countriesNormalizer.getCountry(c1).countryCode,
      phoneNumbers: data2!.numbers
        .filter(({ country: c2 }) => c1 === c2)
        .map(({ full_number, maxdate }) => ({
          phoneNumber: full_number,
          activatedAt: maxdate,
        }))
    }))
  }
}
