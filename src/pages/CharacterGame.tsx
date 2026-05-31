import type Character from '../interfaces/Character.tsx'
import { useDailyCharacter } from '../hooks/useDailyCharacter.tsx'
import ComparatorCharacter from '../components/character/ComparatorCharacter.tsx'
import HelperCharacter from '../components/character/HelperCharacter.tsx'
import Autocomplete from '../components/Autocomplete.tsx'
import {useLocalStorage} from "../hooks/useLocalStorage.ts";
import Button from '../components/Button.tsx'

export function CharacterGame () {
  const { dailyCharacter, isLoading, error } = useDailyCharacter()
  const [lastCharacters, setLastCharacters] = useLocalStorage<Character[]>('hp-character-history', [])
  const lastCharacter = lastCharacters.length > 0 ? lastCharacters[lastCharacters.length -1] : null
  const currentCharacter = dailyCharacter?.attributes as Character | undefined

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
          </p>
        )}
      </div>
        {!isVictory && (
          <Autocomplete
            label="Search a wizard"
            id="search"
            type="character"
            onSelect={(character) => handleSelecteCharacter(character  as Character) }
          />
        )}

        {isVictory && (
          <div
            className="my-8 p-6 bg-green-100 border-2 border-green-500 rounded-2xl text-center shadow-lg transform transition-all">
            <h2 className="text-4xl font-bold text-green-700 mb-4">Victoire !</h2>
            <p className="text-green-800 text-lg">
              Bravo ! Tu as trouvé <strong>{currentCharacter?.name}</strong>
            </p>
            <Button type="button" onClick={() => setLastCharacters([])}>
              Replay?
            </Button>
          </div>
        )}

      <HelperCharacter currentCharacter={dailyCharacter?.attributes as Character}></HelperCharacter>

        {lastCharacters?.length > 0 && lastCharacters.toReversed().map((character, index) => (
          <ComparatorCharacter key={`${character.id}-${index}`}  lastCharacter={character} currentCharacter={dailyCharacter?.attributes as Character}></ComparatorCharacter>
        ))}


    </div>
  )
}

export default CharacterGame