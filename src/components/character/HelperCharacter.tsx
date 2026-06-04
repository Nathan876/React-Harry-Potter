import type Character from '../../interfaces/Character.tsx'
import Button from '../Button.tsx'
import { useEffect, useState } from 'react'
import { useTheme } from '../../hooks/useTheme.tsx'
import type { Theme } from '../../contexts/ThemeContext.tsx'

interface PropsHelperCharacter {
  currentCharacter: Character
  tryCount: number
}

function HelperCharacter (props: PropsHelperCharacter) {
  const [helper, setHelper] = useState<string[]>([])
  const [helpIndex, setHelpIndex] = useState(0)
  const { theme } = useTheme()
  const unlockedHints = Math.floor(props.tryCount / 3)

  const hintBgStyles: Record<Theme, string> = {
    Gryffindor: 'bg-red-50 text-red-950',
    Slytherin: 'bg-emerald-50 text-emerald-950',
    Ravenclaw: 'bg-blue-50 text-blue-950',
    Hufflepuff: 'bg-yellow-50 text-yellow-950',
    Accessible: 'bg-gray-100 text-black'
  }

  useEffect(() => {
    const titles = props.currentCharacter?.titles ?? []
    const familyMembers = props.currentCharacter?.family_members ?? []
    const jobs = props.currentCharacter?.jobs ?? []
    const romance = props.currentCharacter?.romances ?? []

    const initHelper: string[] = []

    if (jobs.length > 0) initHelper.push('💼 Job: ' + jobs[Math.floor(Math.random() * jobs.length)])
    if (titles.length > 0) initHelper.push('👑 Title: ' + titles[Math.floor(Math.random() * titles.length)])
    if (romance.length > 0) initHelper.push('❤️ Romance: ' + romance[Math.floor(Math.random() * romance.length)])
    if (familyMembers.length > 0) initHelper.push('🩸 Family: ' + familyMembers[Math.floor(Math.random() * familyMembers.length)])
    if (props.currentCharacter?.born !== null) initHelper.push('📅 Born: ' + props.currentCharacter?.born)

    setHelper(initHelper)
    setHelpIndex(0)
  }, [props.currentCharacter])

  if (helper.length === 0) return null

  return (
    <div
      className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border-2 border-gray-100/50 w-full transition-all">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-cinzel font-bold text-gray-900">Magical Hints</h3>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-inner">
          {helpIndex} / {helper.length}
        </span>
      </div>

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
        <span>Next hint in {3 - (props.tryCount % 3)} try</span>
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
  )
}

export default HelperCharacter