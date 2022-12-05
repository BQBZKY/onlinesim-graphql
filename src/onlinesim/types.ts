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
