import type Potion from '../../interfaces/Potion.tsx'
import Button from '../Button.tsx'
import { useEffect, useState } from 'react'
import { useTheme } from '../../hooks/useTheme.tsx'
import type { Theme } from '../../contexts/ThemeContext.tsx'

interface PropsHelper {
  currentPotion: Potion
  tryCount: number
}

function HelperPotion (props: PropsHelper) {
  const [helper, setHelper] = useState<string[]>([])
  const [helpIndex, setHelpIndex] = useState(0)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const { theme } = useTheme()
  const unlockedHints = Math.floor(props.tryCount / 3)

  const hintBgStyles: Record<Theme, string> = {
    Gryffindor: 'bg-red-50 text-black',
    Slytherin: 'bg-emerald-50 text-black',
    Ravenclaw: 'bg-blue-50 text-black',
    Hufflepuff: 'bg-yellow-50 text-black',
    Accessible: 'bg-gray-100 text-black'
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

  if (helper.length === 0) return null

  return (
      <div
          className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border-2 border-gray-100/50 w-full transition-all duration-300">

        <div
            className={`flex items-center justify-between cursor-pointer select-none group ${!isCollapsed ? 'mb-6' : ''}`}
            onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-cinzel font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
              Brewing Hints
            </h3>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-inner">
            {helpIndex} / {helper.length}
          </span>
          </div>

          <div className="text-gray-400 group-hover:text-gray-800 transition-colors p-1">
            <svg
                className={`w-6 h-6 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {!isCollapsed && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              {unlockedHints > helpIndex && helpIndex < helper.length && (
                  <Button
                      type="button"
                      disabled={helpIndex >= helper.length}
                      onClick={() => setHelpIndex(helpIndex + 1)}
                      className="w-full text-sm py-2.5 mb-6"
                  >
                    {helpIndex === 0 ? 'Reveal first hint' : 'Get another hint'}
                  </Button>
              )}

              {!(unlockedHints > helpIndex && helpIndex < helper.length) && helpIndex !== helper.length && (
                  <p className="text-sm font-semibold text-gray-500 text-center mb-6 bg-gray-50 py-2 rounded-xl border border-gray-100">
                    Next hint in {3 - (props.tryCount % 3)} {3 - (props.tryCount % 3) > 1 ? 'tries' : 'try'}
                  </p>
              )}

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
        )}
      </div>
  )
}

export default HelperPotion