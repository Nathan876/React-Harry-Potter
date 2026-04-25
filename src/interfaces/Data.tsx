import type Character from './Character.tsx'
import type Movie from './Movie.tsx'
import type Potion from './Potion.tsx'
import type Spell from './Spell.tsx'

export default interface Data {
  id: number
  attributes: Character | Movie | Potion | Spell
  type: string;
}