import { Link } from 'react-router'

export default function Header () {
  const links = [
    { label: 'Characters', href: '/character' }
  ]

  return (
    <header className="flex justify-center gap-6  p-4 shadow-lg">
      <div>
        {links.map((link) => (
          <Link key={link.href} to={link.href}>{link.label}</Link>
        ))}
      </div>
    </header>
  )
}