import type Spell from '../../interfaces/Spell.tsx'
import React from "react";

interface PropsComparatorSpell {
  lastSpells: Spell[]
  currentSpell: Spell
}

function ComparatorSpell (props: PropsComparatorSpell) {
  const headerClass = 'text-xs font-semibold text-gray-500 uppercase tracking-wider'
  const getMatchClass = (currentValue: string, lastValue: string) => {
    return currentValue === lastValue
      ? 'bg-green-100 text-green-800 border-green-300'
      : 'bg-red-100 text-red-800 border-red-300'
  }
  return (
    <div
      className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full max-w-6xl mx-auto my-4">

      <div className="grid grid-cols-4 gap-x-4 gap-y-3 w-full text-center items-center">
        <div className={headerClass}>Name</div>
        <div className={headerClass}>Category</div>
        <div className={headerClass}>Light</div>
        <div className={headerClass}>Creator</div>
        {props.lastSpells.map((spell, index) => (
            <React.Fragment key={`${spell.id || spell.name}-${index}`}>
              <div className="flex items-center justify-start text-left gap-2 text-sm font-bold text-gray-800 w-full">
                {spell.image !== null && (
                    <img
                        src={spell.image}
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        className="h-10 w-auto object-contain drop-shadow-md rounded"
                        alt={spell?.name + ' photo'}
                    />
                )}
                <span>{spell?.name}</span>
              </div>
              <div
                className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentSpell?.category, spell?.category)}`}>
                {spell?.category || '-'}
              </div>
              <div
                className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentSpell?.light, spell?.light)}`}>
                {spell?.light || '-'}
              </div>
              <div
                className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentSpell?.creator, spell?.creator)}`}>
                {spell?.creator || '-'}
              </div>
            </React.Fragment>
        ))}
      </div>
    </div>)
}

export default ComparatorSpell