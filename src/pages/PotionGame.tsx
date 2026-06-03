import AutocompleteDataItem from '../components/AutocompleteDataItem.tsx'
import { useDailyPotion } from '../hooks/useDailyPotion.tsx'
import type Potion from '../interfaces/Potion.tsx'
import ComparatorPotion from '../components/potion/ComparatorPotion.tsx'
import HelperPotion from '../components/potion/HelperPotion.tsx'
import { useLocalStorage } from '../hooks/useLocalStorage.tsx'
import { type ChangeEvent, useState } from 'react'
import { convertDate } from '../utils/dateUtils.ts'
import Button from '../components/Button.tsx'
import type Character from '../interfaces/Character.tsx'
import type Spell from '../interfaces/Spell.tsx'
import {useTheme} from "../hooks/useTheme.tsx";
import type {Theme} from "../contexts/ThemeContext.tsx";


export function PotionGame () {
  const [dateSelected, setDateSelected] = useState<string>(convertDate(new Date()))
  const { dailyPotion, isLoading, error } = useDailyPotion(new Date(dateSelected))
  const [lastPotions, setLastPotions] = useLocalStorage<Potion []>('hp-potion-history', [])
  const lastPotion = lastPotions.length > 0 ? lastPotions[lastPotions.length - 1] : null
  const currentPotion = dailyPotion?.attributes as Potion | undefined

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
    lastPotion &&
    currentPotion &&
    lastPotion.name === currentPotion.name
  )

  async function handleSelectePotion (potion: Potion) {
    setLastPotions(prev => [...prev, potion])
  }

  async function onChangeDate (e: ChangeEvent<HTMLInputElement>) {
    setDateSelected(e.target.value)
    setLastPotions([])
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className={`${baseClasses} ${themeStyles[theme]}`}>
        <div className="w-1/3 text-left">
          {!isVictory ? (
              <AutocompleteDataItem
                  label="Search a potion"
                  id="search"
                  type="potion"
                  onSelect={(potion:  Character | Potion | Spell) => handleSelectePotion(potion as Potion)}
              />
          ) : (
              <div
                  className="my-8 p-6 bg-green-100 border-2 border-green-500 rounded-2xl text-center shadow-lg transform transition-all">
                <h2 className="text-4xl font-bold text-black mb-4">Victoire !</h2>
                <p className="text-black text-lg">
                  Bravo ! Tu as trouvé <strong>{currentPotion?.name}</strong>
                </p>
                <Button type="button" onClick={() => setLastPotions([])}>
                  Replay?
                </Button>
              </div>
            )}
        </div>
        <div className="flex items-center gap-4">
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


      <HelperPotion currentPotion={dailyPotion?.attributes as Potion}></HelperPotion>

      {lastPotions?.length > 0 && (
          <ComparatorPotion
              lastPotions={lastPotions.toReversed()}
              dailyPotion={dailyPotion?.attributes as Potion}
          />
      )}
    </div>
  )
}

export default PotionGame