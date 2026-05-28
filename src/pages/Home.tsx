import AutocompleteCharacter from '../components/AutocompleteCharacter.tsx'
import type Character from '../interfaces/Character.tsx'
import { useDailyCharacter } from '../hooks/useDailyCharacter.tsx'
import { useState } from 'react'
import Comparator from '../components/Comparator.tsx'

export function Home () {
  const { dailyCharacter, isLoading, error } = useDailyCharacter()
  const [lastCharacter, setLastCharacter] = useState<Character | null>(null)
  const currentCharacter = dailyCharacter?.attributes as Character | undefined
  const isVictory = Boolean(
      lastCharacter &&
      currentCharacter &&
      lastCharacter.name === currentCharacter.name
  )


  async function handleSelecteCharacter (character: Character) {
    console.log('Personnage du jour :', dailyCharacter)
    console.log('Personnage selectionner ', character)
    setLastCharacter(character)
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-2">Personnage du jour :</h2>
        {isLoading ? (
          <p className="text-gray-500">Recherche dans les archives magiques...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-green-600 font-bold text-2xl">
            {(dailyCharacter?.attributes as Character).name}
          </p>
        )}
      </div>

        {!isVictory && (
            <AutocompleteCharacter
                label="Chercher un sorcier"
                id="search"
                onSelect={(character: Character) => handleSelecteCharacter(character)}
            />
        )}

      {lastCharacter !== null && (
        <Comparator
          lastCharacter={lastCharacter}
          currentCharacter={dailyCharacter?.attributes as Character}
        />
      )}

        {isVictory && (
            <div className="my-8 p-6 bg-green-100 border-2 border-green-500 rounded-2xl text-center shadow-lg transform transition-all">
                <h2 className="text-4xl font-bold text-green-700 mb-4">Victoire !</h2>
                <p className="text-green-800 text-lg">
                    Bravo ! Tu as trouvé <strong>{currentCharacter?.name}</strong>
                </p>
            </div>
        )}


    </div>
  )
}

export default Home