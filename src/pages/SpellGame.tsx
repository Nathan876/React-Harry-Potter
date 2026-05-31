import { useDailySpell } from '../hooks/useDailySpell.tsx'
import { useState } from 'react'
import type Spell from '../interfaces/Spell.tsx'
import HelperSpell from '../components/spell/HelperSpell.tsx'
import ComparatorSpell from '../components/spell/ComparatorSpell.tsx'
import Autocomplete from '../components/Autocomplete.tsx'


export function SpellGame () {
  const { dailySpell, isLoading, error } = useDailySpell()
  const [lastSpell, setLastSpell] = useState<Spell | null>(null)
  const [lastSpells, setLastSpells] = useState<Spell []>([])
  const currentSpell = dailySpell?.attributes as Spell | undefined

  const isVictory = Boolean(
    lastSpell &&
    currentSpell &&
    lastSpell.name === currentSpell.name
  )

  async function handleSelecteSpell (Spell: Spell) {
    setLastSpell(Spell)
    lastSpells.push(Spell)
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

      {lastSpells?.length > 0 && lastSpells.toReversed().map(Spell => (
        <ComparatorSpell lastSpell={Spell} currentSpell={dailySpell?.attributes as Spell}></ComparatorSpell>
      ))}


    </div>
  )
}

export default SpellGame