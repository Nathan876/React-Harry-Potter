import type ResponseListApi from '../interfaces/ResponseListApi.tsx'

export const url = 'https://api.potterdb.com/v1/movies'

export async function getAllMovies () :Promise<ResponseListApi>{
  const res = await fetch(url)
  return await res.json() as ResponseListApi
}