import { Link } from 'react-router'
import type { Theme } from '../contexts/ThemeContext.tsx'
import { useTheme } from '../hooks/useTheme.tsx'

export default function Header () {
  const { theme, setTheme } = useTheme()
  const links = [
    { label: 'Character', href: '/character' },
    { label: 'Potion', href: '/potion' }
  ]

  const themeStyles: Record<Theme, string> = {
    Gryffindor: 'bg-red-800 text-yellow-400 border-yellow-500 focus:ring-yellow-500/50',
    Slytherin: 'bg-green-800 text-gray-300 border-gray-400  focus:ring-gray-400/50',
    Ravenclaw: 'bg-blue-900 text-bronze-400 border-blue-400 focus:ring-blue-400/50',
    Hufflepuff: 'bg-yellow-500 text-black border-black focus:ring-yellow-600/50',
    Accessible: 'bg-white text-black border-black focus:ring-black/50'
  }

  const logoStyles: Record<Theme, string> = {
    Gryffindor: 'drop-shadow-md',
    Slytherin: 'drop-shadow-md',
    Ravenclaw: 'drop-shadow-md',
    Hufflepuff: 'drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]',
    Accessible: ''
  }

  const baseClasses = 'flex justify-between items-center p-1 px-10'

  return (
    <header className={`${baseClasses} ${themeStyles[theme]}`}>
      {theme === 'Accessible' ? (
        <span className="font-cinzel font-black text-2xl uppercase tracking-widest text-black">
          Harry Potter
        </span>
      ) : (
        <img
          src="/Harry-Potter-Logo.webp"
          alt="logo harry potter"
          fetchPriority="high"
          loading="eager"
          className={`w-24 h-auto transition-all duration-300 ${logoStyles[theme]}`}
        />
      )}
      <div className="flex gap-6">
        {links.map((link) => (
          <Link key={link.href} to={link.href} className="font-cinzel font-bold hover:opacity-80">
            {link.label}
          </Link>
        ))}
      </div>

      <div>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
          className="p-2 rounded border bg-white/10 text-inherit font-lora"
        >
          <option value="Gryffindor">Gryffindor</option>
          <option value="Hufflepuff">Hufflepuff</option>
          <option value="Ravenclaw">Ravenclaw</option>
          <option value="Slytherin">Slytherin</option>
          <option value="Accessible">Accessible</option>
        </select>
      </div>
    </header>
  )
}