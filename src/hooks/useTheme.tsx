import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext.tsx'

export function useTheme () {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('Le useTheme doit être utilisé dans un ThemeProvider')
  }
  return context
}