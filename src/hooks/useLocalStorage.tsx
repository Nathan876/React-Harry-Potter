import { useState, useEffect } from 'react'
import { convertDate } from '../utils/dateUtils.ts'

export function useLocalStorage<T> (key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      const data = item ? JSON.parse(item) : initialValue

      if (convertDate(new Date()) !== data['date']) {
        return []
      }

      return data['data'] ?? []
    } catch (error) {
      console.error('Erreur de lecture du localStorage:', error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      const test = {
        date: convertDate(new Date()),
        data: storedValue
      }
      window.localStorage.setItem(key, JSON.stringify(test))
    } catch (error) {
      console.error('Erreur d\'écriture dans le localStorage:', error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
}