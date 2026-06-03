import type Character from './Character.tsx'
import type Potion from './Potion.tsx'
import type Spell from './Spell.tsx'

export default interface DataItem {
  id: string
  attributes: Character | Potion | Spell
  type: string;
}