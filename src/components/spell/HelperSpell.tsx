import type Spell from '../../interfaces/Spell.tsx'
import Button from '../Button.tsx'
import { useEffect, useState } from 'react'
import type {Theme} from "../../contexts/ThemeContext.tsx";
import {useTheme} from "../../hooks/useTheme.tsx";

interface PropsHelper {
  currentSpell: Spell
}

function HelperSpell (props: PropsHelper) {
  const [helper, setHelper] = useState<string[]>([])
  const [helpIndex, setHelpIndex] = useState(0)
  const {theme} = useTheme()

  const themeStyles: Record<Theme, string> = {
    Gryffindor: "bg-red-800 text-yellow-400 border-yellow-500 focus:ring-yellow-500/50",
    Slytherin: "bg-green-800 text-gray-300 border-gray-400  focus:ring-gray-400/50",
    Ravenclaw: "bg-blue-900 text-bronze-400 border-blue-400 focus:ring-blue-400/50",
    Hufflepuff: "bg-yellow-500 text-black border-black focus:ring-yellow-600/50",
    Accessible: "bg-white text-black border-black focus:ring-black/50"
  }

  const buttonStyles: Record<Theme, string> = {
    Gryffindor: "bg-red-800 text-yellow-400 border-yellow-500 hover:bg-red-700 hover:text-yellow-200 hover:shadow-[0_0_20px_rgba(234,179,8,0.6)] focus:ring-yellow-500/50",
    Slytherin: "bg-green-800 text-gray-300 border-gray-400 hover:bg-green-700 hover:text-white hover:shadow-[0_0_20px_rgba(156,163,175,0.6)] focus:ring-gray-400/50",
    Ravenclaw: "bg-blue-900 text-bronze-400 border-blue-400 hover:bg-blue-800 hover:text-blue-200 hover:shadow-[0_0_20px_rgba(96,165,250,0.6)] focus:ring-blue-400/50",
    Hufflepuff: "bg-yellow-500 text-black border-black hover:bg-yellow-400 hover:text-gray-900 hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] focus:ring-yellow-600/50",
    Accessible: "bg-white text-black border-black"
  }

  const counterBoxStyles: Record<Theme, string> = {
    Gryffindor: "bg-amber-100 text-amber-950 border-amber-200",
    Slytherin: "bg-amber-100 text-amber-950 border-amber-200",
    Ravenclaw: "bg-amber-100 text-amber-950 border-amber-200",
    Hufflepuff: "bg-amber-100 text-amber-950 border-amber-200",
    Accessible: "bg-white text-black border-2 border-black"
  }

  const counterSlashStyles: Record<Theme, string> = {
    Gryffindor: "text-amber-700",
    Slytherin: "text-amber-700",
    Ravenclaw: "text-amber-700",
    Hufflepuff: "text-amber-700",
    Accessible: "text-black font-bold"
  }
  const baseClasses = "mb-8 p-4 rounded-lg text-center flex items-center justify-between"

  useEffect(() => {
    const initHelper: string[] = []
    const effect = props.currentSpell?.effect
    const hand = props.currentSpell?.hand
    const incantation = props.currentSpell?.incantation

    if (effect !== null) initHelper.push('Effect: ' + effect)
    if (hand !== null) initHelper.push('Hand: ' + hand)
    if (incantation !== null) initHelper.push('Incantation: ' + incantation)

    setHelper(initHelper)
    setHelpIndex(0)
  }, [props.currentSpell])

  return (
    <div
      className={`${baseClasses} ${themeStyles[theme]}`}>
      <div className="relative z-10 flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between w-full">
          <Button
              type="button"
              disabled={helpIndex >= helper.length}
              onClick={() => setHelpIndex(helpIndex + 1)}
              className={buttonStyles[theme]}
          >
            Hint
          </Button>

          <div
              className={`flex items-center text-right px-2 py-1 rounded border shadow-inner transition-colors duration-300 ${counterBoxStyles[theme]}`}>
            <div className="text-3xl font-black tabular-nums">
              {helpIndex} <span className={`text-xl ml-1 transition-colors duration-300 ${counterSlashStyles[theme]}`}>/ {helper.length}</span>
            </div>
          </div>
        </div>

        {helpIndex > 0 && (
          <ul className="flex flex-col gap-2 m-0 p-0">
            {helper.slice(0, helpIndex).map((hint, i) => (
                <li
                    key={`${hint}-${i}`}
                    className="flex items-center gap-4 p-2 text-base leading-relaxed text-amber-950 bg-white/60 border border-amber-100 rounded-lg shadow-lg"
                >
                  <span className="text-amber-500 text-2xl mt-0.5">⭐</span>

                  <span className="italic">{hint}</span>
                </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default HelperSpell