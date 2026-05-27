import type ResponseListApi from '../interfaces/ResponseListApi.tsx'

export const url = 'https://api.potterdb.com/v1/characters'

export async function getCharacters (): Promise<ResponseListApi> {
  const res = await fetch(url +
    '?filter[born_not_null]=true' +
    '&filter[hair_color_not_null]=true' +
    '&filter[species_not_null]=true' +
    '&filter[gender_not_null]=true' +
    '&filter[height_not_null]=true' +
    '&filter[blood_status_not_null]=true'
  )
  return await res.json()
}

export async function getCharactersForAutocomplete (query: string): Promise<ResponseListApi> {
  const res = await fetch(url +
    '?filter[born_not_null]=true' +
    '&filter[hair_color_not_null]=true' +
    '&filter[species_not_null]=true' +
    '&filter[gender_not_null]=true' +
    '&filter[height_not_null]=true' +
    '&filter[blood_status_not_null]=true' +
    `&filter[name_cont]=${query}` +
    '&page[size]=10'
  )
  return await res.json()
}
