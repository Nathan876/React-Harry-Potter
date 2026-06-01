import type Character from '../interfaces/Character.tsx'
import type Spell from '../interfaces/Spell.tsx'
import type Potion from '../interfaces/Potion.tsx'
import { useState } from 'react'
import { getCharactersForAutocomplete } from '../services/CharacterService.tsx'
import { getSpellsForAutocomplete } from '../services/SpellService.tsx'
import { getPotionsForAutocomplete } from '../services/PotionService.tsx'
import { Autocomplete, TextField } from '@mui/material'
import type DataItem from '../interfaces/DataItem.tsx'

interface PropsAutocomplete {
  label: string;
  id: string;
  placeholder?: string;
  type: string;
  onSelect: (item: Character | Spell | Potion) => void;
}

function AutocompleteDataItem (props: PropsAutocomplete) {
  const [autocompleteItems, setAutocompleteItems] = useState<DataItem[]>([])
  const [input, setInput] = useState('')

  function handleAutocompleteSelect (item: DataItem) {
    props.onSelect(item.attributes)
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
    <section className="p-8 rounded-lg shadow-lg border flex flex-col justify-center transition-colors duration-300">
      <div className="relative w-full">
        <label
          htmlFor={props.id}
          className="block font-cinzel font-semibold mb-2 pl-2 transition-colors duration-300"
        >
          {props.label}
        </label>

        <Autocomplete
          id={props.id}
          value={null}
          inputValue={input}
          options={autocompleteItems}
          getOptionLabel={(option) => option.attributes?.name || ''}
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
            />
          )}
        />
      </div>
    </section>
  )
}

export default AutocompleteDataItem