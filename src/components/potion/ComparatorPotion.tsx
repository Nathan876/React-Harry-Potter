import React from 'react'
import type Potion from '../../interfaces/Potion.tsx'

interface PropsComparatorPotion {
  lastPotions: Potion[]
  dailyPotion: Potion
}

function ComparatorPotion (props: PropsComparatorPotion) {
  const headerClass = 'text-xs font-semibold text-gray-500 uppercase tracking-wider'
  const getMatchClass = (dailyPotion: string, potion: string) => {
    return dailyPotion === potion
      ? 'bg-green-100 text-green-800 border-green-300'
      : 'bg-red-100 text-red-800 border-red-300'
  }

  const getMatchClassForIngredients = (dailyPotion: string, potion: string) => {
    if (potion && dailyPotion) {
      let count = 0
      const potionIngredients = potion.split(',')
      const dailyIngredients = dailyPotion.split(',')

      dailyIngredients.forEach(potion => {
        if (potionIngredients.includes(potion)) {
          count++
        }
      })

      if (count === potionIngredients.length && potionIngredients.length === dailyIngredients.length) {
        return 'bg-green-100 text-green-800 border-green-300'
      }

      return count === 0 ? 'bg-red-100 text-red-800 border-red-300' : 'bg-orange-100 text-orange-800 border-orange-300'
    }
    return dailyPotion === potion
      ? 'bg-green-100 text-green-800 border-green-300'
      : 'bg-red-100 text-red-800 border-red-300'
  }

  return (
    <div
      className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full max-w-6xl mx-auto my-4">

      <div className="grid grid-cols-6 gap-x-4 gap-y-3 w-full text-center items-center">
        <div className={headerClass}>Nom</div>
        <div className={headerClass}>Ingredients</div>
        <div className={headerClass}>Difficulty</div>
        <div className={headerClass}>Time</div>
        <div className={headerClass}>Inventors</div>
        <div className={headerClass}>Manufacturers</div>

        {props.lastPotions.map((potion, index) => (
          <React.Fragment key={`${potion.id || potion.name}-${index}`}>

            <div className="flex items-center justify-start text-left gap-2 text-sm font-bold text-gray-800 w-full">
              {potion.image !== null && (
                <img
                  src={potion.image}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  className="h-10 w-auto object-contain drop-shadow-md rounded"
                  alt={potion?.name + ' photo'}
                />
              )}
              <span>{potion?.name}</span>
            </div>

            <div
              className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClassForIngredients(props.dailyPotion?.ingredients, potion?.ingredients)}`}>
              {potion?.ingredients || '-'}
            </div>
            <div
              className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.dailyPotion?.difficulty, potion?.difficulty)}`}>
              {potion?.difficulty || '-'}
            </div>
            <div
              className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.dailyPotion?.time, potion?.time)}`}>
              {potion?.time || '-'}
            </div>
            <div
              className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.dailyPotion?.inventors, potion?.inventors)}`}>
              {potion?.inventors || '-'}
            </div>
            <div
              className={`p-2 rounded-lg border font-medium transition-colors ${getMatchClass(props.dailyPotion?.manufacturers, potion?.manufacturers)}`}>
              {potion?.manufacturers || '-'}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>)
}

export default ComparatorPotion