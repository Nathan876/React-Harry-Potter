import type { House } from '../Enums/HouseEnum.tsx'

export default interface Character {
  id: string
  alias_names: string[]
  animagus: string
  blood_status: string
  boggart: string
  born: string
  died: string
  eye_color: string
  family_member: string[]
  gender: string
  hair_color: string
  height: string
  house: House
  image: string
  jobs: string[]
  name: string
  nationality: string
  patronus: string
  romances: string[]
  skin_color: string
  slug: string
  species: string
  titles: string[]
  wands: string[]
  weight: string
  wiki: string
}