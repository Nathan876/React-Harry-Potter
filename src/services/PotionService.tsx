import type ResponseListApi from '../interfaces/ResponseListApi.tsx'

export const url = 'https://api.potterdb.com/v1/potions'

export async function getQtyPotions () :Promise<ResponseListApi>{
  const res = await fetch(url +
    `?page[size]=1`)
  return await res.json()
}

export async function getDailyPotions (index :number) :Promise<ResponseListApi>{
  const res = await fetch(url +
    `?page[size]=1&page[nnumber]=${index}`)
  return await res.json()
}

export async function getPotionsForAutocomplete (query: string): Promise<ResponseListApi> {
  const res = await fetch(url +
    `?filter[name_cont]=${query}&page[size]=10`
  )
  return await res.json()
}