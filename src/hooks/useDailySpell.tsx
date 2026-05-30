import { useEffect, useState } from 'react'
import type DataItem from '../interfaces/DataItem.tsx'
import { getDailySpells, getQtySpells } from '../services/SpellService.tsx'

export function useDailySpell () {
  const [dailySpell, setDailySpell] = useState<DataItem | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDaily = async () => {
      try {
        setIsLoading(true)
        const response = await getQtySpells()
        const spellsQty = response.meta.pagination.records

        if (spellsQty > 0) {
          const today = new Date()
          const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
          const dailyIndex = dateSeed % spellsQty + 1
          const dailySpell = await getDailySpells(dailyIndex)
          if(dailySpell.data.length > 0){
            setDailySpell(dailySpell.data[0])
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

  return { dailySpell, isLoading, error }
}