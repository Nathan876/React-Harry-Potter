import AutocompleteCharacter from '../components/AutocompleteCharacter.tsx'
import type Character from '../interfaces/Character.tsx'
import { useDailyCharacter } from '../hooks/useDailyCharacter.tsx'
import {useEffect, useState} from 'react'
import Comparator from '../components/Comparator.tsx'
import Helper from '../components/Helper.tsx'

export function Home () {
  const { dailyCharacter, isLoading, error } = useDailyCharacter()
  const [lastCharacters, setLastCharacters] = useState<Character []>(()=> {
    const savedHistory = localStorage.getItem('hp-history')
    if (savedHistory) {
      return JSON.parse(savedHistory)
    } else {
      return []
    }
  })
  const lastCharacter = lastCharacters.length > 0 ? lastCharacters[lastCharacters.length -1] : null
  const currentCharacter = dailyCharacter?.attributes as Character | undefined

  useEffect(() => {
    localStorage.setItem('hp-history', JSON.stringify(lastCharacters))
  }, [lastCharacters])

  const isVictory = Boolean(
    lastCharacter &&
    currentCharacter &&
    lastCharacter.name === currentCharacter.name
  )


  async function handleSelecteCharacter (character: Character) {
    console.log('Personnage du jour :', dailyCharacter)
    console.log('Personnage selectionner ', character)
    setLastCharacters(prev => [...prev, character])

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

        {isVictory && (
          <div
            className="my-8 p-6 bg-green-100 border-2 border-green-500 rounded-2xl text-center shadow-lg transform transition-all">
            <h2 className="text-4xl font-bold text-green-700 mb-4">Victoire !</h2>
            <p className="text-green-800 text-lg">
              Bravo ! Tu as trouvé <strong>{currentCharacter?.name}</strong>
            </p>
          </div>
        )}

      <Helper currentCharacter={dailyCharacter?.attributes as Character}></Helper>

        {lastCharacters?.length > 0 && lastCharacters.toReversed().map((character, index) => (
          <Comparator key={`${character.id}-${index}`}  lastCharacter={character} currentCharacter={dailyCharacter?.attributes as Character}></Comparator>
        ))}


    </div>
  )
}

export default Home