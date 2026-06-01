import Autocomplete from '../components/Autocomplete.tsx'
import { useDailyPotion } from '../hooks/useDailyPotion.tsx'
import type Potion from '../interfaces/Potion.tsx'
import ComparatorPotion from '../components/potion/ComparatorPotion.tsx'
import HelperPotion from '../components/potion/HelperPotionl.tsx'
import { useLocalStorage } from '../hooks/useLocalStorage.ts'
import { type ChangeEvent, useState } from 'react'
import { convertDate } from '../utils/dateUtils.ts'
import Button from '../components/Button.tsx'


export function PotionGame () {
  const [dateSelected, setDateSelected] = useState<string>(convertDate(new Date()))
  const { dailyPotion, isLoading, error } = useDailyPotion(new Date(dateSelected))
  const [lastPotions, setLastPotions] = useLocalStorage<Potion []>('hp-potion-history', [])
  const lastPotion = lastPotions.length > 0 ? lastPotions[lastPotions.length - 1] : null
  const currentPotion = dailyPotion?.attributes as Potion | undefined

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
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-2">Potion du jour :</h2>
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
        <Autocomplete
          label="Search a potion"
          id="search"
          type="potion"
          onSelect={(potion) => handleSelectePotion(potion as Potion)}
        />
      )}

      {isVictory && (
        <div
          className="my-8 p-6 bg-green-100 border-2 border-green-500 rounded-2xl text-center shadow-lg transform transition-all">
          <h2 className="text-4xl font-bold text-green-700 mb-4">Victoire !</h2>
          <p className="text-green-800 text-lg">
            Bravo ! Tu as trouvé <strong>{currentPotion?.name}</strong>
          </p>
          <Button type="button" onClick={() => setLastPotions([])}>
            Replay?
          </Button>
        </div>
      )}

      <HelperPotion currentPotion={dailyPotion?.attributes as Potion}></HelperPotion>

      {lastPotions?.length > 0 && lastPotions.toReversed().map((potion, index) => (
        <ComparatorPotion key={`${potion.id}-${index}`} potion={potion}
                          dailyPotion={dailyPotion?.attributes as Potion}></ComparatorPotion>
      ))}


    </div>
  )
}

export default PotionGame