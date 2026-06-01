import { useEffect, useState } from 'react'
import type DataItem from '../interfaces/DataItem.tsx'
import { getDailySpells, getQtySpells } from '../services/SpellService.tsx'

let cachedSpellsQty: number | null = null

export function useDailySpell (date: Date) {
  const [dailySpell, setDailySpell] = useState<DataItem | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const dateSeed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()

  useEffect(() => {
    const fetchDaily = async () => {
      try {
        setIsLoading(true)
        if (cachedSpellsQty === null) {
          const response = await getQtySpells()
          cachedSpellsQty = response.meta.pagination.records
        }

        if (cachedSpellsQty > 0) {
          const dailyIndex = dateSeed % cachedSpellsQty + 1
          const dailySpell = await getDailySpells(dailyIndex)
          if (dailySpell.data.length > 0) {
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
  }, [dateSeed])

  return { dailySpell, isLoading, error }
}