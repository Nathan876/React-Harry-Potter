import { useEffect, useState } from 'react'
import type DataItem from '../interfaces/DataItem.tsx'
import { getDailyPotions, getQtyPotions } from '../services/PotionService.tsx'

let cachedPotionQty: number | null = null

export function useDailyPotion (date: Date) {
  const [dailyPotion, setDailyPotion] = useState<DataItem | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const dateSeed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()

  useEffect(() => {
    const fetchDaily = async () => {
      try {
        setIsLoading(true)
        if (cachedPotionQty === null) {
          const response = await getQtyPotions()
          cachedPotionQty = response.meta.pagination.records
        }

        if (cachedPotionQty > 0) {
          const dailyIndex = dateSeed % cachedPotionQty + 1
          const dailyPotion = await getDailyPotions(dailyIndex)
          if (dailyPotion.data.length > 0) {
            setDailyPotion(dailyPotion.data[0])
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

  return { dailyPotion, isLoading, error }
}