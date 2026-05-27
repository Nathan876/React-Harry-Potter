import AutocompleteCharacter from '../components/AutocompleteCharacter.tsx'
import type Character from '../interfaces/Character.tsx'
import { useDailyCharacter } from '../hooks/useDailyCharacter.tsx'

export function Home () {
    const { dailyCharacter, isLoading, error } = useDailyCharacter()

    async function handleSelecteCharacter(character: Character) {
        console.log("Personnage du jour :", character)
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
                        {dailyCharacter?.attributes?.name}
                    </p>
                )}
            </div>

            <AutocompleteCharacter
                label="Chercher un sorcier"
                id="search"
                onSelect={(character: Character) => handleSelecteCharacter(character)}
            />
        </div>
    )
}

export default Home