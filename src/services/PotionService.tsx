import type Potion from '../interfaces/Potion.tsx'

export const url = 'https://api.potterdb.com/v1/potions'

export async function getAllPotions () :Promise<Potion[]>{
  const res = await fetch(url)
  const data = await res.json()
  console.log(data.data)
  return data
}