import { useTheme } from '../hooks/useTheme.tsx'
import type { Theme } from '../contexts/ThemeContext.tsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

function Button (props: ButtonProps) {

  const { theme } = useTheme()

  const themeStyles: Record<Theme, string> = {
    Gryffindor: 'bg-red-800 text-yellow-400 border-yellow-500 hover:bg-red-700 hover:text-yellow-200 hover:shadow-[0_0_20px_rgba(234,179,8,0.6)] focus:ring-yellow-500/50',
    Slytherin: 'bg-green-800 text-gray-300 border-gray-400 hover:bg-green-700 hover:text-white hover:shadow-[0_0_20px_rgba(156,163,175,0.6)] focus:ring-gray-400/50',
    Ravenclaw: 'bg-blue-900 text-bronze-400 border-blue-400 hover:bg-blue-800 hover:text-blue-200 hover:shadow-[0_0_20px_rgba(96,165,250,0.6)] focus:ring-blue-400/50',
    Hufflepuff: 'bg-yellow-500 text-black border-black hover:bg-yellow-400 hover:text-gray-900 hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] focus:ring-yellow-600/50',
    Accessible: 'bg-white text-black border-black hover:bg-gray-200 hover:shadow-md focus:ring-black/50'
  }

  const baseClasses = 'px-8 py-3 border-2 rounded-full font-cinzel font-bold uppercase tracking-widest shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4'

  return (
    <button type="button" {...props} className={`${baseClasses} ${themeStyles[theme]} ${props.className || ''}`}>
      {props.children}
    </button>
  )
}

export default Button
