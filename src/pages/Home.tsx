import AutocompleteCharacter from '../components/AutocompleteCharacter.tsx'
import type Character from '../interfaces/Character.tsx'

export function Home () {
  async function handleSelecteCharacter(character: Character) {
  // ici on reçois le personnage selectionner il ne reste qu'à faire la comparaison
}
  return (<div>
      <AutocompleteCharacter
        label="Chercher un sorcier"
        id="search"
        onSelect={(character :Character) => handleSelecteCharacter(character)}
      />    </div>

  )
}

export default Home