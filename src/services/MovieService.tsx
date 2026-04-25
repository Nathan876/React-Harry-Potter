import type ResponseApi from '../interfaces/ResponseApi.tsx'

export const url = 'https://api.potterdb.com/v1/movies'

export async function getAllMovies () :Promise<ResponseApi>{
  const res = await fetch(url)
  return await res.json() as ResponseApi
}