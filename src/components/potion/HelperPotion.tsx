import type Potion from '../../interfaces/Potion.tsx'
import Button from '../Button.tsx'
import { useEffect, useState } from 'react'
import { useTheme } from "../../hooks/useTheme.tsx";
import type { Theme } from "../../contexts/ThemeContext.tsx";

interface PropsHelper {
  currentPotion: Potion
}

function HelperPotion (props: PropsHelper) {
  const [helper, setHelper] = useState<string[]>([])
  const [helpIndex, setHelpIndex] = useState(0)
  const {theme} = useTheme()

  const hintBgStyles: Record<Theme, string> = {
    Gryffindor: "bg-red-50 text-red-950",
    Slytherin: "bg-emerald-50 text-emerald-950",
    Ravenclaw: "bg-blue-50 text-blue-950",
    Hufflepuff: "bg-yellow-50 text-yellow-950",
    Accessible: "bg-gray-100 text-black"
  }

  useEffect(() => {
    const initHelper: string[] = []
    const effect = props.currentPotion?.effect
    const characteristics = props.currentPotion?.characteristics
    const sideEffects = props.currentPotion?.side_effects

    if (effect !== null && effect !== undefined) initHelper.push('✨ Effect: ' + effect)
    if (characteristics !== null && characteristics !== undefined) initHelper.push('🔬 Characteristics: ' + characteristics)
    if (sideEffects !== null && sideEffects !== undefined) initHelper.push('⚠️ Side effects: ' + sideEffects)

    setHelper(initHelper)
    setHelpIndex(0)
  }, [props.currentPotion])

  if (helper.length === 0) return null;

  return (
      <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border-2 border-gray-100/50 w-full transition-all">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-cinzel font-bold text-gray-900">Brewing Hints</h3>
          <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-inner">
          {helpIndex} / {helper.length}
        </span>
        </div>

        <Button
            type="button"
            disabled={helpIndex >= helper.length}
            onClick={() => setHelpIndex(helpIndex + 1)}
            className="w-full text-sm py-2.5 mb-6"
        >
          {helpIndex === 0 ? "Reveal first hint" : "Get another hint"}
        </Button>

        {helpIndex > 0 && (
            <ul className="flex flex-col gap-3">
              {helper.slice(0, helpIndex).map((hint, i) => (
                  <li
                      key={`${hint}-${i}`}
                      className={`px-4 py-3 rounded-xl text-sm font-medium border border-transparent shadow-sm animate-in slide-in-from-top-2 duration-300 ${hintBgStyles[theme]}`}
                  >
                    {hint}
                  </li>
              ))}
            </ul>
        )}
      </div>
  )
}

export default HelperPotion