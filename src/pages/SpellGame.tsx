import { useDailySpell } from '../hooks/useDailySpell.tsx'
import type Spell from '../interfaces/Spell.tsx'
import HelperSpell from '../components/spell/HelperSpell.tsx'
import ComparatorSpell from '../components/spell/ComparatorSpell.tsx'
import Autocomplete from '../components/Autocomplete.tsx'
import {useLocalStorage} from "../hooks/useLocalStorage.ts";


export function SpellGame () {
  const { dailySpell, isLoading, error } = useDailySpell()
  const [lastSpells, setLastSpells] = useLocalStorage<Spell []>('hp-spell-history', [])

  const lastSpell = lastSpells.length > 0 ? lastSpells[lastSpells.length - 1] : null
  const currentSpell = dailySpell?.attributes as Spell | undefined


  const isVictory = Boolean(
    lastSpell &&
    currentSpell &&
    lastSpell.name === currentSpell.name
  )

  async function handleSelecteSpell (spell: Spell) {
    console.log('Sort du jour :', dailySpell)
    console.log('Sort selectionner ', spell)
    setLastSpells(prev => [...prev, spell])
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-2">Sort du jour :</h2>
        {isLoading ? (
          <p className="text-gray-500">Recherche dans les archives magiques...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-green-600 font-bold text-2xl">
            {(dailySpell?.attributes as Spell).name}
          </p>
        )}
      </div>
      {!isVictory && (
        <Autocomplete
          label="Search a spell"
          id="search"
          type="spell"
          onSelect={(Spell) => handleSelecteSpell(Spell as Spell)}
        />
      )}

      {isVictory && (
        <div
          className="my-8 p-6 bg-green-100 border-2 border-green-500 rounded-2xl text-center shadow-lg transform transition-all">
          <h2 className="text-4xl font-bold text-green-700 mb-4">Victoire !</h2>
          <p className="text-green-800 text-lg">
            Bravo ! Tu as trouvé <strong>{currentSpell?.name}</strong>
          </p>
        </div>
      )}

      <HelperSpell currentSpell={dailySpell?.attributes as Spell}></HelperSpell>

      {lastSpells?.length > 0 && lastSpells.toReversed().map((Spell, index) => (
        <ComparatorSpell key={`${Spell.id}-${index}`} lastSpell={Spell} currentSpell={dailySpell?.attributes as Spell}></ComparatorSpell>
      ))}


    </div>
  )
}

export default SpellGame