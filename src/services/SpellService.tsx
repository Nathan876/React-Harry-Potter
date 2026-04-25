import type ResponseApi from '../interfaces/ResponseApi.tsx'

export const url = 'https://api.potterdb.com/v1/movies'

export async function getAllSpells () :Promise<ResponseApi>{
  const res = await fetch(url)
  const data = await res.json()
  console.log(data)
  return data
}