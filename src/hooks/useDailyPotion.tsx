import { useEffect, useState } from 'react'
import type DataItem from '../interfaces/DataItem.tsx'
import { getDailyPotions, getQtyPotions } from '../services/PotionService.tsx'

export function useDailyPotion () {
  const [dailyPotion, setDailyPotion] = useState<DataItem | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDaily = async () => {
      try {
        setIsLoading(true)
        const response = await getQtyPotions()
        const potionsQty = response.meta.pagination.records

        if (potionsQty > 0) {
          const today = new Date()
          const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
          const dailyIndex = dateSeed % potionsQty + 1
          const dailyPotion = await getDailyPotions(dailyIndex)
          if(dailyPotion.data.length > 0){
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
  }, [])

  return { dailyPotion, isLoading, error }
}