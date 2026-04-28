import type ResponseListApi from '../interfaces/ResponseListApi.tsx'

export const url = 'https://api.potterdb.com/v1/movies'

export async function getAllSpells () :Promise<ResponseListApi>{
  const res = await fetch(url)
  const data = await res.json()
  console.log(data)
  return data
}