import type Spell from '../../interfaces/Spell.tsx'

interface PropsComparatorSpell {
  lastSpell: Spell
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
      className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full max-w-4xl mx-auto my-4">
      <h2 className="flex items-center justify-center text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-100 w-full text-center">
        {props.lastSpell.image !== null &&
          (<img src={props.lastSpell.image} className="h-10  w-auto object-contain drop-shadow-md rounded" alt={props.lastSpell?.name + 'photo'}/>
          )}
        {props.lastSpell?.name}
      </h2>

      <div className="grid grid-cols-3 gap-x-4 gap-y-3 w-full text-center items-center">
        <div className={headerClass}>Category</div>
        <div className={headerClass}>Light</div>
        <div className={headerClass}>Creator</div>

        <div
          className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentSpell?.category, props.lastSpell?.category)}`}>
          {props.lastSpell?.category || '-'}
        </div>
        <div
          className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentSpell?.light, props.lastSpell?.light)}`}>
          {props.lastSpell?.light || '-'}
        </div>
        <div
          className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentSpell?.creator, props.lastSpell?.creator)}`}>
          {props.lastSpell?.creator || '-'}
        </div>
      </div>
    </div>)
}

export default ComparatorSpell