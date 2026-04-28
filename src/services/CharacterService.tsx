import type ResponseListApi from '../interfaces/ResponseListApi.tsx'
import type { House } from '../Enums/HouseEnum.tsx'
import type ResponseApi from '../interfaces/ResponseApi.tsx'

export const url = 'https://api.potterdb.com/v1/characters'

export async function getCharacters (): Promise<ResponseListApi> {
  const res = await fetch(url + '?filter[born_not_null]=true&filter[hair_color_not_null]=true&filter[blood_status_not_null]=true&page[number]=2')
  return await res.json()
}

export async function getCharactersByHouse (house: House | undefined, page?: number): Promise<ResponseListApi> {
  const res = await fetch(url + `?filter[born_not_null]=true&filter[hair_color_not_null]=true&filter[blood_status_not_null]=true&${house ? `filter[house_eq]=${house}` : ''}${page ? `&page[number]=${page}` : ''}`)

  return await res.json()
}

export async function getCharacterById (id: string): Promise<ResponseApi> {
  const res = await fetch(url +'/'+ id)

  return await res.json()
}
