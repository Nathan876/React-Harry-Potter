import type Character from '../../interfaces/Character.tsx'

interface PropsComporatorCharacter {
  lastCharacter: Character
  currentCharacter: Character
}

function ComparatorCharacter (props: PropsComporatorCharacter) {
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
        {props?.lastCharacter?.image !== null && (<img src={props?.lastCharacter?.image} className="h-10  w-auto object-contain drop-shadow-md rounded" alt={props.lastCharacter?.name + 'photo'}/>)}
        {props?.lastCharacter?.name}
      </h2>

      <div className="grid grid-cols-7 gap-x-4 gap-y-3 w-full text-center items-center">
        <div className={headerClass}>Gender</div>
        <div className={headerClass}>Hair color</div>
        <div className={headerClass}>Species</div>
        <div className={headerClass}>Blood status</div>
        <div className={headerClass}>House</div>
        <div className={headerClass}>Nationality</div>
        <div className={headerClass}>Patronus</div>

        <div
          className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentCharacter?.gender, props.lastCharacter?.gender)}`}>
          {props.lastCharacter?.gender || '-'}
        </div>
        <div
          className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentCharacter?.hair_color, props.lastCharacter?.hair_color)}`}>
          {props.lastCharacter?.hair_color || '-'}
        </div>
        <div
          className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentCharacter?.species, props.lastCharacter?.species)}`}>
          {props.lastCharacter?.species || '-'}
        </div>
        <div
          className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentCharacter?.blood_status, props.lastCharacter?.blood_status)}`}>
          {props.lastCharacter?.blood_status || '-'}
        </div>
        <div
          className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentCharacter?.house, props.lastCharacter?.house)}`}>
          {props.lastCharacter?.house || '-'}
        </div>
        <div
          className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentCharacter?.nationality, props.lastCharacter?.nationality)}`}>
          {props.lastCharacter?.nationality || '-'}
        </div>
        <div
          className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.currentCharacter?.patronus, props.lastCharacter?.patronus)}`}>
          {props.lastCharacter?.patronus || '-'}
        </div>
      </div>
    </div>)
}

export default ComparatorCharacter