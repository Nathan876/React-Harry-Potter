import type Spell from '../../interfaces/Spell.tsx'
import Button from '../Button.tsx'
import { useEffect, useState } from 'react'

interface PropsHelper {
  currentSpell: Spell
}

function HelperSpell (props: PropsHelper) {
  const [helper, setHelper] = useState<string[]>([])
  const [helpIndex, setHelpIndex] = useState(0)

  useEffect(() => {
    const initHelper: string[] = []
    const effect = props.currentSpell?.effect
    const hand = props.currentSpell?.hand
    const incantation = props.currentSpell?.incantation

    if (effect !== null) initHelper.push(effect)
    if (hand !== null) initHelper.push(hand)
    if (incantation !== null) initHelper.push(incantation)

    setHelper(initHelper)
    setHelpIndex(0)
  }, [props.currentSpell])

  return (
    <div
      className="w-full mx-auto p-4 bg-[#fdfaf1] border-2  border-amber-900/30 rounded-xl shadow-2xl font-serif relative overflow-hidden">
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Button
            type="button"
            disabled={helpIndex >= helper.length}
            onClick={() => setHelpIndex(helpIndex + 1)}
          >
            <span className="text-lg">✨</span>
            Cast <span className="font-bold text-amber-100 group-hover:text-white">Revelio</span>! 🪄
          </Button>

          <div
            className="flex items-center text-right bg-amber-100 text-amber-950 px-2 py-1 rounded border border-amber-200 shadow-inner">
            <div className="text-3xl font-black tabular-nums">
              {helpIndex} <span className="text-xl text-amber-700">/ {helper.length}</span>
            </div>
          </div>
        </div>

        {helpIndex > 0 && (
          <ul className="flex flex-col gap-2 m-0 p-0">
            {helper.slice(0, helpIndex).map((hint, i) => (
              <li
                key={`${hint}-${i}`}
                className="flex items-center gap-4 p-2 text-base leading-relaxed text-amber-950 bg-white/60 border border-amber-100 rounded-lg shadow-lg animate-fade-in-down"
                style={{ animationDelay: `${i * 100}ms` }}
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