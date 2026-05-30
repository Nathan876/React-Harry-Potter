import { Link } from 'react-router'
import type { Theme } from '../contexts/ThemeContext.tsx'
import { useTheme } from '../hooks/useTheme.tsx'

export default function Header () {
  const { theme, setTheme } = useTheme()
  const links = [
    { label: 'Character', href: '/character' },
    { label: 'Spell', href: '/spell' }
  ]

  return (
    <header className="flex justify-between items-center p-4 shadow-lg bg-black/20">
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