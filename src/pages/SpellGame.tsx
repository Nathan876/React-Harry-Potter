import { useDailySpell } from '../hooks/useDailySpell.tsx'
import type Spell from '../interfaces/Spell.tsx'
import HelperSpell from '../components/spell/HelperSpell.tsx'
import ComparatorSpell from '../components/spell/ComparatorSpell.tsx'
import AutocompleteDataItem from '../components/AutocompleteDataItem.tsx'
import { type ChangeEvent, useState } from 'react'
import { convertDate } from '../utils/dateUtils.ts'
import { useLocalStorage } from '../hooks/useLocalStorage.ts'
import Button from '../components/Button.tsx'
import type DataItem from '../interfaces/DataItem.tsx'


export function SpellGame () {
  const [dateSelected, setDateSelected] = useState<string>(convertDate(new Date()))
  const { dailySpell, isLoading, error } = useDailySpell(new Date(dateSelected))
  const [lastSpells, setLastSpells] = useLocalStorage<DataItem []>('hp-spell-history', [])

  const lastSpell = lastSpells.length > 0 ? lastSpells[lastSpells.length - 1] : null
  const currentSpell = dailySpell?.attributes as DataItem | undefined

  const isVictory = Boolean(
    lastSpell &&
    currentSpell &&
    lastSpell?.attributes?.name === currentSpell?.attributes?.name
  )

  async function handleSelecteSpell (spell: DataItem) {
    console.log('Sort du jour :', dailySpell)
    console.log('Sort selectionner ', spell)
    setLastSpells(prev => [...prev, spell])
  }

  async function onChangeDate (e: ChangeEvent<HTMLInputElement>) {
    setDateSelected(e.target.value)
    setLastSpells([])
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center flex items-center justify-between">
        <h2 className="text-xl font-bold mb-2">Sort du jour :</h2>
        {isLoading ? (
          <p className="text-gray-500">Recherche dans les archives magiques...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-green-600 font-bold text-2xl">
          </p>
        )}
        <input type={'date'} max={convertDate(new Date())} value={dateSelected} onChange={(e) => onChangeDate(e)}/>
      </div>
      {!isVictory && (
        <AutocompleteDataItem
          label="Search a spell"
          id="search"
          type="spell"
          onSelect={(spell: DataItem) => handleSelecteSpell(spell as DataItem)}
          lastItems={lastSpells}
        />
      )}

      {isVictory && (
        <div
          className="my-8 p-6 bg-green-100 border-2 border-green-500 rounded-2xl text-center shadow-lg transform transition-all">
          <h2 className="text-4xl font-bold text-green-700 mb-4">Victoire !</h2>
          <p className="text-green-800 text-lg">
            Bravo ! Tu as trouvé <strong>{currentSpell?.attributes?.name}</strong>
          </p>
          <Button type="button" onClick={() => setLastSpells([])}>
            Replay?
          </Button>
        </div>
      )}

      <HelperSpell currentSpell={dailySpell?.attributes as Spell}></HelperSpell>

      {lastSpells?.length > 0 && lastSpells.toReversed().map((spell, index) => (
        <ComparatorSpell key={`${spell.id}-${index}`} lastSpell={spell.attributes as Spell}
                         currentSpell={dailySpell?.attributes as Spell}></ComparatorSpell>
      ))}


    </div>
  )
}

export default SpellGame