import type { Theme } from '../contexts/ThemeContext.tsx'

export default interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}