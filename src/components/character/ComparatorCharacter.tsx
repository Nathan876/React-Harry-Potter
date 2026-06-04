import React from "react"
import type Character from '../../interfaces/Character.tsx'

interface PropsComparatorCharacter {
  lastCharacters: Character[]
  currentCharacter: Character
}

function ComparatorCharacter (props: PropsComparatorCharacter) {
  const headerClass = 'text-xs font-semibold text-gray-500 uppercase tracking-wider'
  const getMatchClass = (currentValue: string, lastValue: string) => {
    return currentValue === lastValue
      ? 'bg-green-100 text-green-800 border-green-300'
      : 'bg-red-100 text-red-800 border-red-300'
  }
  return (
    <div
      className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full max-w-6xl mx-auto my-4">

      <div className="grid grid-cols-8 gap-x-4 gap-y-3 w-full text-center items-center">
        <div className={headerClass}>Name</div>
        <div className={headerClass}>Gender</div>
        <div className={headerClass}>Hair color</div>
        <div className={headerClass}>Species</div>
        <div className={headerClass}>Blood status</div>
        <div className={headerClass}>House</div>
        <div className={headerClass}>Nationality</div>
        <div className={headerClass}>Patronus</div>

        {props.lastCharacters.map((char, index) => (
            <React.Fragment key={`${char.id || char.name}-${index}`}>
              <div className="flex items-center justify-start text-left gap-2 text-sm font-bold text-gray-800 w-full">
                {char.image !== null && (<img src={char.image} referrerPolicy="no-referrer" crossOrigin="anonymous" className="h-10 w-auto object-contain drop-shadow-md rounded" alt={char?.name + ' photo'}/>)}
                <span>{char?.name}</span>
              </div>
              <div
                className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentCharacter?.gender, char?.gender)}`}>
                {char?.gender || '-'}
              </div>
              <div
                className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentCharacter?.hair_color, char?.hair_color)}`}>
                {char?.hair_color || '-'}
              </div>
              <div
                className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentCharacter?.species, char?.species)}`}>
                {char?.species || '-'}
              </div>
              <div
                className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentCharacter?.blood_status, char?.blood_status)}`}>
                {char?.blood_status || '-'}
              </div>
              <div
                className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentCharacter?.house, char?.house)}`}>
                {char?.house || '-'}
              </div>
              <div
                className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentCharacter?.nationality, char?.nationality)}`}>
                {char?.nationality || '-'}
              </div>
              <div
                className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentCharacter?.patronus, char?.patronus)}`}>
                {char?.patronus || '-'}
              </div>
            </React.Fragment>
            ))}
      </div>
    </div>
  )
}

export default ComparatorCharacter