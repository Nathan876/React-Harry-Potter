import type Character from '../interfaces/Character.tsx'
import { useDailyCharacter } from '../hooks/useDailyCharacter.tsx'
import ComparatorCharacter from '../components/character/ComparatorCharacter.tsx'
import HelperCharacter from '../components/character/HelperCharacter.tsx'
import AutocompleteDataItem from '../components/AutocompleteDataItem.tsx'
import { type ChangeEvent, useState } from 'react'
import { convertDate } from '../utils/dateUtils.ts'
import { useLocalStorage } from '../hooks/useLocalStorage.tsx'
import Button from '../components/Button.tsx'
import type DataItem from '../interfaces/DataItem.tsx'

export function CharacterGame () {
  const [dateSelected, setDateSelected] = useState<string>(convertDate(new Date()))
  const { dailyCharacter, isLoading, error } = useDailyCharacter(new Date(dateSelected))
  const [lastCharacters, setLastCharacters] = useLocalStorage<DataItem[]>('hp-character-history', [])
  const lastCharacter = lastCharacters.length > 0 ? lastCharacters[lastCharacters.length - 1] : null
  const currentCharacter = dailyCharacter as DataItem | undefined

  const isVictory = Boolean(
    lastCharacter &&
    currentCharacter &&
    lastCharacter?.attributes?.name === currentCharacter?.attributes?.name
  )

  async function handleSelecteCharacter (character: DataItem) {
    setLastCharacters(prev => [...prev, character])
  }

  async function onChangeDate (e: ChangeEvent<HTMLInputElement>) {
    setDateSelected(e.target.value)
    setLastCharacters([])
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen flex flex-col gap-6 bg-gray-50/50">

      <div className="flex justify-end w-full relative z-20">
        <div className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm">
          <label htmlFor="game-date" className="text-xs font-bold uppercase tracking-wider text-gray-500 shrink-0">
            Archives
          </label>
          <input
            id="game-date"
            type="date"
            max={convertDate(new Date())}
            value={dateSelected}
            onChange={onChangeDate}
            className="bg-transparent text-sm font-semibold text-gray-800 outline-none cursor-pointer"
          />
        </div>
      </div>

      <div className="relative w-full flex flex-col gap-8 mt-2">

        <div className="w-full bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 relative z-10">
          <h1 className="text-2xl md:text-3xl font-cinzel font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span>🪄</span> Daily Wizard
          </h1>

          {isLoading || error ? (
            <div className="absolute top-8 right-8">
              {isLoading && <p className="text-sm font-medium text-gray-500 animate-pulse">Consulting archives...</p>}
              {error && <p className="text-sm font-medium text-red-600">⚠️ {error}</p>}
            </div>
          ) : null}

          {!isVictory ? (
            <AutocompleteDataItem
              label="Search for a wizard..."
              id="search"
              type="character"
              onSelect={handleSelecteCharacter}
              lastItems={lastCharacters}
            />
          ) : (
            <div
              className="py-6 px-6 bg-green-50 border border-green-100 rounded-xl flex flex-col items-center text-center animate-in fade-in duration-500">
              <span className="text-4xl mb-3">✨</span>
              <h2 className="text-2xl font-bold text-green-950 mb-2 font-cinzel">Mischief Managed!</h2>
              <p className="text-green-800 text-base mb-6">
                You discovered <strong>{currentCharacter?.attributes?.name}</strong>
              </p>
              <Button type="button" onClick={() => setLastCharacters([])}>
                Play Again
              </Button>
            </div>
          )}
        </div>

        <div className="block lg:hidden w-full relative z-10">
          <HelperCharacter currentCharacter={dailyCharacter?.attributes as Character} tryCount={lastCharacters.length}/>
        </div>

        {lastCharacters?.length > 0 && (
          <div
            className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative z-0 animate-in fade-in slide-in-from-bottom-4 duration-500 mb-32">
            <div className="p-4 bg-gray-50/75 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Attempt History</h2>
              <span className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                {lastCharacters.length} attempts
              </span>
            </div>

            <div className="p-4 w-full overflow-x-auto">
              <ComparatorCharacter
                lastCharacters={lastCharacters.toReversed().map(item => item.attributes as Character)}
                currentCharacter={dailyCharacter?.attributes as Character}
              />
            </div>
          </div>
        )}

      </div>

      <div className="fixed bottom-8 left-8 w-80 z-50 hidden lg:block">
        <HelperCharacter currentCharacter={dailyCharacter?.attributes as Character} tryCount={lastCharacters.length}/>
      </div>

    </div>
  )
}

export default CharacterGame