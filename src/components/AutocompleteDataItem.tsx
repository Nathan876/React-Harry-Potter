import type Character from '../interfaces/Character.tsx'
import type Spell from '../interfaces/Spell.tsx'
import type Potion from '../interfaces/Potion.tsx'
import { useState } from 'react'
import { getCharactersForAutocomplete } from '../services/CharacterService.tsx'
import { getSpellsForAutocomplete } from '../services/SpellService.tsx'
import { getPotionsForAutocomplete } from '../services/PotionService.tsx'
import { Autocomplete, TextField } from '@mui/material'
import type DataItem from '../interfaces/DataItem.tsx'
import {useTheme} from "../hooks/useTheme.tsx";
import type {Theme} from "../contexts/ThemeContext.tsx";

interface PropsAutocomplete {
  label: string;
  id: string;
  placeholder?: string;
  type: string;
  onSelect: (item: Character | Spell | Potion) => void;
}

function AutocompleteDataItem (props: PropsAutocomplete) {
  const { theme } = useTheme()
  const [autocompleteItems, setAutocompleteItems] = useState<DataItem[]>([])
  const [input, setInput] = useState('')

  const labelStyles: Record<Theme, string> = {
    Gryffindor: 'text-red-900',
    Slytherin: 'text-green-900',
    Ravenclaw: 'text-blue-900',
    Hufflepuff: 'text-yellow-900',
    Accessible: 'text-black'
  }

  const themeStyles: Record<Theme, string> = {
    Gryffindor: "bg-red-800 text-yellow-400 border-yellow-500",
    Slytherin: "bg-green-800 text-gray-300 border-gray-400",
    Ravenclaw: "bg-blue-900 text-bronze-400 border-blue-400",
    Hufflepuff: "bg-yellow-500 text-black border-black",
    Accessible: "bg-white text-black border-black"
  }

  const inputStyles: Record<Theme, string> = {
    Gryffindor: "bg-red-800 text-yellow-400 border-yellow-500 focus-within:border-yellow-400 focus-within:ring-yellow-500/50",
    Slytherin: "bg-green-800 text-gray-200 border-gray-400 focus-within:border-gray-300 focus-within:ring-gray-400/50",
    Ravenclaw: "bg-blue-900 text-blue-200 border-blue-400 focus-within:border-blue-300 focus-within:ring-blue-400/50",
    Hufflepuff: "bg-yellow-500 text-black border-black focus-within:border-gray-800 focus-within:ring-yellow-600/50",
    Accessible: "bg-white text-black border-black focus-within:border-black focus-within:ring-black"
  }

  const iconStyles: Record<Theme, string> = {
    Gryffindor: "text-yellow-400",
    Slytherin: "text-gray-200",
    Ravenclaw: "text-blue-200",
    Hufflepuff: "text-black",
    Accessible: "text-black"
  }
  const dropdownStyles: Record<Theme, string> = {
    Gryffindor: 'bg-white border-red-900/20 shadow-red-900/10',
    Slytherin: 'bg-white border-green-900/20 shadow-green-900/10',
    Ravenclaw: 'bg-white border-blue-900/20 shadow-blue-900/10',
    Hufflepuff: 'bg-white border-yellow-900/20 shadow-yellow-900/10',
    Accessible: 'bg-white border-black shadow-black/20'
  }

  const listItemHoverStyles: Record<Theme, string> = {
    Gryffindor: 'hover:bg-red-50 text-red-900',
    Slytherin: 'hover:bg-green-50 text-green-900',
    Ravenclaw: 'hover:bg-blue-50 text-blue-900',
    Hufflepuff: 'hover:bg-yellow-50 text-yellow-900',
    Accessible: 'hover:bg-gray-200 text-black font-medium'
  }


  function handleAutocompleteSelect (item: DataItem) {
    props.onSelect(item.attributes)
    setAutocompleteItems([])
    setInput('')
  }

  const baseClasses = "mb-8 p-4 rounded-lg flex flex-col justify-center transition-colors duration-300"

  async function handleInputChange (value: string) {
    if (value.trim() === '') {
      setAutocompleteItems([])
      return
    }

    let data = null
    switch (props.type) {
      case 'spell':
        data = await getSpellsForAutocomplete(value)
        break
      case 'potion':
        data = await getPotionsForAutocomplete(value)
        break
      case 'character':
        data = await getCharactersForAutocomplete(value)
        break
    }
    setAutocompleteItems(data?.data || [])
  }

  return (
      <section className={`${baseClasses} ${themeStyles[theme]}`}>
      <div className="relative w-full">
        <label
            htmlFor={props.id}
            className={`block font-cinzel font-semibold mb-2 pl-2 transition-colors duration-300 ${labelStyles[theme]}`}
        >
          {props.label}
        </label>

        <Autocomplete
          id={props.id}
          value={null}
          inputValue={input}
          options={autocompleteItems}
          getOptionLabel={(option) => option.attributes?.name || ''}

          popupIcon={
            <svg className={`fill-current h-5 w-5 ${iconStyles[theme]}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          }

          slotProps={{
            paper: {
              className: `mt-2 rounded-xl shadow-lg border overflow-hidden ${dropdownStyles[theme]}`
            }
          }}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props

            return (
              <li
                key={key}
                {...optionProps}
                className={`${optionProps.className || ''} flex items-center px-6 py-3 cursor-pointer transition-colors duration-200 border-b border-stone-100 last:border-b-0 ${listItemHoverStyles[theme]}`}
              >
                {option.attributes.image !== null && (
                  <img
                    src={option.attributes.image}
                    className="h-10 w-auto object-contain drop-shadow-md rounded mr-2"
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

          onInputChange={async (_event, newInputValue) => {
            setInput(newInputValue)
            await handleInputChange(newInputValue)
          }}

          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={props.placeholder}
              variant="outlined"
              slotProps={{
                ...params.slotProps,
                input: {
                  ...params.slotProps?.input,
                  className: `w-full !rounded-full border shadow-inner transition-all duration-300 [&>fieldset]:border-0 ${inputStyles[theme]}`
                },
                htmlInput: {
                  ...params.slotProps?.htmlInput,
                  className: `${params.slotProps?.htmlInput?.className || ''} !py-3 !pl-6 !pr-2 text-left !bg-transparent placeholder-current`,
                  'aria-label': props.label
                }
              }}
            />
          )}
        />
      </div>
    </section>
  )
}

export default AutocompleteDataItem