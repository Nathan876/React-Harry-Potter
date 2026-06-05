import { useState } from 'react'
import { getCharactersForAutocomplete } from '../services/CharacterService.tsx'
import { getPotionsForAutocomplete } from '../services/PotionService.tsx'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import type DataItem from '../interfaces/DataItem.tsx'
import { useTheme } from '../hooks/useTheme.tsx'
import type { Theme } from '../contexts/ThemeContext.tsx'

interface PropsAutocomplete {
  label: string;
  id: string;
  placeholder?: string;
  type: string;
  onSelect: (item: DataItem) => void;
  lastItems: DataItem[];
}

function AutocompleteDataItem (props: PropsAutocomplete) {
  const { theme } = useTheme()
  const [autocompleteItems, setAutocompleteItems] = useState<DataItem[]>([])
  const [input, setInput] = useState('')
  const inputRingStyles: Record<Theme, string> = {
    Gryffindor: 'focus-within:ring-red-600 focus-within:border-red-600',
    Slytherin: 'focus-within:ring-emerald-600 focus-within:border-emerald-600',
    Ravenclaw: 'focus-within:ring-blue-600 focus-within:border-blue-600',
    Hufflepuff: 'focus-within:ring-yellow-500 focus-within:border-yellow-500',
    Accessible: 'focus-within:ring-black focus-within:border-black'
  }

  const iconStyles: Record<Theme, string> = {
    Gryffindor: 'text-red-700',
    Slytherin: 'text-emerald-700',
    Ravenclaw: 'text-blue-700',
    Hufflepuff: 'text-yellow-600',
    Accessible: 'text-black'
  }

  const listItemHoverStyles: Record<Theme, string> = {
    Gryffindor: 'hover:bg-red-50 hover:text-red-900',
    Slytherin: 'hover:bg-emerald-50 hover:text-emerald-900',
    Ravenclaw: 'hover:bg-blue-50 hover:text-blue-900',
    Hufflepuff: 'hover:bg-yellow-50 hover:text-yellow-900',
    Accessible: 'hover:bg-gray-100 hover:text-black'
  }

  const getOptimizedImageUrl = (url: string) => {
    if (!url) return ''
    return `https://wsrv.nl/?url=${encodeURIComponent(url)}&h=64&output=webp`
  }

  function handleAutocompleteSelect (item: DataItem) {
    props.onSelect(item)
    setAutocompleteItems([])
    setInput('')
  }

  async function handleInputChange (value: string) {
    if (value.trim() === '') {
      setAutocompleteItems([])
      return
    }

    let data = null
    switch (props.type) {
      case 'potion':
        data = await getPotionsForAutocomplete(value)
        break
      case 'character':
        data = await getCharactersForAutocomplete(value)
        break
    }

    const filteredData: DataItem[] | undefined = data?.data.filter(dataItem => props.lastItems.findIndex(item => item.id === dataItem.id) < 0)
    setAutocompleteItems(filteredData || [])
  }

  return (
    <div className="w-full relative">
      <Autocomplete
        id={props.id}
        value={null}
        inputValue={input}
        options={autocompleteItems}
        getOptionLabel={(option) => option.attributes?.name || ''}

        popupIcon={
          <svg className={`fill-current h-5 w-5 transition-colors ${iconStyles[theme]}`}
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
          </svg>
        }

        slotProps={{
          paper: {
            className: 'mt-2 rounded-xl shadow-lg border border-gray-100 bg-white overflow-hidden'
          }
        }}

        renderOption={(props, option) => {
          const { key, ...optionProps } = props
          return (
            <li
              key={key}
              {...optionProps}
              className={`${optionProps.className || ''} flex items-center px-6 py-3 cursor-pointer transition-colors duration-200 border-b border-gray-50 last:border-b-0 text-gray-700 font-medium ${listItemHoverStyles[theme]}`}
            >
              {option.attributes.image !== null && (
                <img
                  src={getOptimizedImageUrl(option.attributes.image)}
                  loading="lazy"
                  className="h-8 w-8 object-cover rounded-full shadow-sm mr-4 border border-gray-200"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  alt={option.attributes.name + ' photo'}
                />
              )}
              {option.attributes.name}
            </li>
          )
        }}

        onChange={(_event, value) => {
          if (value) {
            handleAutocompleteSelect(value)
          }
        }}

        onInputChange={async (_event, newInputValue, reason) => {
          if (reason === 'input') {
            setInput(newInputValue)
            await handleInputChange(newInputValue)
          }
        }}

        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={props.placeholder || props.label}
            variant="outlined"
            slotProps={{
              ...params.slotProps,
              input: {
                ...params.slotProps?.input,
                className: `w-full bg-white !rounded-xl border border-gray-300 shadow-sm transition-all duration-300 [&>fieldset]:border-0 focus-within:ring-2 focus-within:shadow-md ${inputRingStyles[theme]}`
              },
              htmlInput: {
                ...params.slotProps?.htmlInput,
                className: `${params.slotProps?.htmlInput?.className || ''} !py-2.5 !pl-5 !pr-4 text-left !bg-transparent !text-gray-900 font-medium text-base placeholder-gray-400`
              }
            }}
          />
        )}
      />
    </div>
  )
}

export default AutocompleteDataItem