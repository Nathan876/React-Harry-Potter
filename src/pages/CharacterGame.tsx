import type Character from '../interfaces/Character.tsx'
import { useDailyCharacter } from '../hooks/useDailyCharacter.tsx'
import ComparatorCharacter from '../components/character/ComparatorCharacter.tsx'
import HelperCharacter from '../components/character/HelperCharacter.tsx'
import AutocompleteDataItem from '../components/AutocompleteDataItem.tsx'
import { type ChangeEvent, useState } from 'react'
import { convertDate } from '../utils/dateUtils.ts'
import {useLocalStorage} from "../hooks/useLocalStorage.tsx";
import Button from '../components/Button.tsx'
import {useTheme} from "../hooks/useTheme.tsx";
import type {Theme} from "../contexts/ThemeContext.tsx";
import type DataItem from '../interfaces/DataItem.tsx'

export function CharacterGame () {
  const [dateSelected, setDateSelected] = useState<string>(convertDate(new Date()))
  const { dailyCharacter, isLoading, error } = useDailyCharacter(new Date(dateSelected))
  const [lastCharacters, setLastCharacters] = useLocalStorage<DataItem[]>('hp-character-history', [])
  const lastCharacter = lastCharacters.length > 0 ? lastCharacters[lastCharacters.length - 1] : null
  const currentCharacter = dailyCharacter as DataItem | undefined

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
    lastCharacter &&
    currentCharacter &&
    lastCharacter?.attributes?.name === currentCharacter?.attributes?.name
  )

  async function handleSelecteCharacter (character: DataItem) {
    console.log('Personnage du jour :', dailyCharacter)
    console.log('Personnage selectionner ', character)
    setLastCharacters(prev => [...prev, character])
  }

  async function onChangeDate (e: ChangeEvent<HTMLInputElement>) {
    setDateSelected(e.target.value)
    setLastCharacters([])
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className={`${baseClasses} ${themeStyles[theme]}`}>
        <div className="w-1/3 text-left">
          {!isVictory ? (
              <AutocompleteDataItem
                  label="Search a wizard"
                  id="search"
                  type="character"
                  onSelect={(character: DataItem)  => handleSelecteCharacter(character)}
                  lastItems={lastCharacters}
              />
          ) : (
              <div
                  className="my-8 p-6 bg-green-100 border-2 border-green-500 rounded-2xl text-center shadow-lg transform transition-all">
                <h2 className="text-4xl font-bold text-black mb-4">Victoire !</h2>
                <p className="text-black text-lg">
                  Bravo ! Tu as trouvé <strong>{currentCharacter?.attributes?.name}</strong>
                </p>
                <Button type="button" onClick={() => setLastCharacters([])}>
                  Replay?
                </Button>
              </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {isLoading ? (
              <p className="text-yellow-400">Recherche dans les archives magiques...</p>
          ) : error ? (
              <p className="text-red-500">{error}</p>
          ) : (
              <p className="text-green-600 font-bold text-2xl">
              </p>
          )}
          <input type={'date'} max={convertDate(new Date())} value={dateSelected} onChange={(e) => onChangeDate(e)}/>
        </div>
      </div>
      <HelperCharacter currentCharacter={dailyCharacter?.attributes as Character}></HelperCharacter>

      {lastCharacters?.length > 0 && (
        <ComparatorCharacter lastCharacters={lastCharacters.toReversed().map(item => item.attributes as Character)}
                             currentCharacter={dailyCharacter?.attributes as Character}></ComparatorCharacter>
      )}

    </div>
  )
}

export default CharacterGame