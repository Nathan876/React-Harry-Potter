import { useState, useEffect } from 'react'
import { getDailyCharacter, getQtyCharacters } from '../services/CharacterService'
import type DataItem from '../interfaces/DataItem'

let cachedSpellsQty: number | null = null

export function useDailyCharacter (date: Date) {
  const [dailyCharacter, setDailyCharacter] = useState<DataItem | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const dateSeed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()

  useEffect(() => {
    const fetchDaily = async () => {
      try {
        setIsLoading(true)
        if (cachedSpellsQty === null) {
          const response = await getQtyCharacters()
          cachedSpellsQty = response.meta.pagination.records
        }

        if (cachedSpellsQty > 0) {
          const dailyIndex = dateSeed % cachedSpellsQty
          const dailyCharacter = await getDailyCharacter(dailyIndex)
          if (dailyCharacter.data.length > 0) {
            setDailyCharacter(dailyCharacter.data[0])
          }
        }
        setIsLoading(false)
      } catch (err) {
        console.error('Erreur lors de la récupération:', err)
        setError('Impossible de charger le personnage du jour.')
        setIsLoading(false)
      }
    }
    fetchDaily()
  }, [dateSeed])

  return { dailyCharacter, isLoading, error }
}