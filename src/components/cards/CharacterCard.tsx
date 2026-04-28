import { Link } from 'react-router'
import type DataItem from '../../interfaces/DataItem.tsx'
import type Character from '../../interfaces/Character.tsx'

interface CharacterCardProps {
  data: DataItem;
}

export function CharacterCard ({ data }: CharacterCardProps) {
  const character = data.attributes as Character

  return (
    <Link to={`/character/${data.id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 flex flex-col">

      <div className="h-64 w-full bg-gray-100">
        <img
          src={character.image || 'https://placehold.co/400x600/e2e8f0/475569?text=Image+Indisponible'}
          alt={`Portrait de ${character.name}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate" title={character.name}>
          {character.name}
        </h3>
      </div>

    </Link>
  )
}

export default CharacterCard