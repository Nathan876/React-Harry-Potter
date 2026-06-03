import { useDailySpell } from '../hooks/useDailySpell.tsx'
import type Spell from '../interfaces/Spell.tsx'
import HelperSpell from '../components/spell/HelperSpell.tsx'
import ComparatorSpell from '../components/spell/ComparatorSpell.tsx'
import AutocompleteDataItem from '../components/AutocompleteDataItem.tsx'
import { type ChangeEvent, useState } from 'react'
import { convertDate } from '../utils/dateUtils.ts'
import {useLocalStorage} from "../hooks/useLocalStorage.tsx";
import Button from '../components/Button.tsx'
import type Character from '../interfaces/Character.tsx'
import type Potion from '../interfaces/Potion.tsx'
import {useTheme} from "../hooks/useTheme.tsx";
import type {Theme} from "../contexts/ThemeContext.tsx";


export function SpellGame () {
  const [dateSelected, setDateSelected] = useState<string>(convertDate(new Date()))
  const { dailySpell, isLoading, error } = useDailySpell(new Date(dateSelected))
  const [lastSpells, setLastSpells] = useLocalStorage<Spell []>('hp-spell-history', [])

  const lastSpell = lastSpells.length > 0 ? lastSpells[lastSpells.length - 1] : null
  const currentSpell = dailySpell?.attributes as Spell | undefined

  const {theme} = useTheme()

  const themeStyles: Record<Theme, string> = {
    Gryffindor: "bg-red-800 text-yellow-400 border-yellow-500 focus:ring-yellow-500/50",
    Slytherin: "bg-green-800 text-gray-300 border-gray-400  focus:ring-gray-400/50",
    Ravenclaw: "bg-blue-900 text-bronze-400 border-blue-400 focus:ring-blue-400/50",
    Hufflepuff: "bg-yellow-500 text-black border-black focus:ring-yellow-600/50",
    Accessible: "bg-white text-black border-black focus:ring-black/50"
  }

  const baseClasses = "mb-8 p-4 rounded-lg text-center flex items-center justify-between"

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

  async function onChangeDate (e: ChangeEvent<HTMLInputElement>) {
    setDateSelected(e.target.value)
    setLastSpells([])
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className={`${baseClasses} ${themeStyles[theme]}`}>
        <div className="w-1/3 text-left">
          {!isVictory ? (
              <AutocompleteDataItem
                  label="Search a spell"
                  id="search"
                  type="spell"
                  onSelect={(spell:  Character | Potion | Spell) => handleSelecteSpell(spell as Spell)}
              />
          ) : (
              <div
                  className="my-8 p-6 bg-green-100 border-2 border-green-500 rounded-2xl text-center shadow-lg transform transition-all">
                <h2 className="text-4xl font-bold text-black mb-4">Victoire !</h2>
                <p className="text-black text-lg">
                  Bravo ! Tu as trouvé <strong>{currentSpell?.name}</strong>
                </p>
                <Button type="button" onClick={() => setLastSpells([])}>
                  Replay?
                </Button>
              </div>
          )}
        </div>
        <div>
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
      </div>


      <HelperSpell currentSpell={dailySpell?.attributes as Spell}></HelperSpell>

      {lastSpells?.length > 0 && (
          <ComparatorSpell
              lastSpells={lastSpells.toReversed()}
              currentSpell={dailySpell?.attributes as Spell}
          />
      )}


    </div>
  )
}

export default SpellGame