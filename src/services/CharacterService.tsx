import type ResponseListApi from '../interfaces/ResponseListApi.tsx'


const excludedNames = ["unidentified", "girl", "boy", "tournament", "champion", "spectator", "quidditch"];

const excludeNamesParams = excludedNames
.map(word => `filter[name_not_cont_all][]=${word}`)
.join("&");

const defaultFilter =
  '?filter[born_not_null]=true' +
  '&filter[species_not_null]=true' +
  '&filter[gender_not_null]=true' +
  '&filter[blood_status_not_null]=true&' +
  excludeNamesParams

export const url = 'https://api.potterdb.com/v1/characters'

export async function getQtyCharacters (): Promise<ResponseListApi> {
  const res = await fetch(url + `${defaultFilter}&page[size]=1&page[size]=1`)
  return await res.json()
}

export async function getDailyCharacter (index: number): Promise<ResponseListApi> {
  const res = await fetch(url + `${defaultFilter}&page[size]=1&page[number]=${index}`)
  return await res.json()
}

export async function getCharactersForAutocomplete (query: string): Promise<ResponseListApi> {
  const res = await fetch(url + `${defaultFilter}&filter[name_start]=${query}&page[size]=10`)
  return await res.json()
}
