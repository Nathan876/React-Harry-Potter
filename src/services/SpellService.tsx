import type ResponseListApi from '../interfaces/ResponseListApi.tsx'

export const url = 'https://api.potterdb.com/v1/spells'

export async function getQtySpells () :Promise<ResponseListApi>{
  const res = await fetch(url +
  `?page[size]=1`)
  return await res.json()
}

export async function getDailySpells (index :number) :Promise<ResponseListApi>{
  const res = await fetch(url +
    `?page[size]=1&page[number]=${index}`)
  return await res.json()
}

export async function getSpellsForAutocomplete (query: string): Promise<ResponseListApi> {
  const res = await fetch(url +
    `?filter[name_start]=${query}&page[size]=10`
  )
  return await res.json()
}