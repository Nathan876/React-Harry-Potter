import { useTheme } from '../hooks/useTheme.tsx'
import type { Theme } from '../contexts/ThemeContext.tsx'
import type Character from '../interfaces/Character.tsx'
import { useState } from 'react'
import { getCharactersForAutocomplete } from '../services/CharacterService.tsx'
import type ResponseListApi from '../interfaces/ResponseListApi.tsx'

interface PropsInput {
  label: string;
  id: string;
  placeholder?: string;
  type?: string;
  onSelect: (character: Character) => void;
}

function AutocompleteCharacter (props: PropsInput) {
  const { theme } = useTheme()
  const [input, setInput] = useState('')
  const [autocompleteItems, setAutocompleteItems] = useState<Character[]>([])

  function handleAutocompleteSelect (character: Character) {
    setInput(character.name)
    setAutocompleteItems([])
    props.onSelect(character)
  }

  async function handleInputChange (event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setInput(value)

    if (value.trim() === '') {
      setAutocompleteItems([])
      return
    }

    const data = await getCharactersForAutocomplete(value)
    const items = getAutocompletItem(data)
    setAutocompleteItems(items)
  }

  function getAutocompletItem (data: ResponseListApi): Character[] {
    if (!data || !data.data) return []
    return data.data.map((item) => item.attributes as Character)
  }


  const sectionStyles: Record<Theme, string> = {
    Gryffindor: 'bg-orange-50 border-red-900/20',
    Slytherin: 'bg-green-50 border-green-900/20',
    Ravenclaw: 'bg-blue-50 border-blue-900/20',
    Hufflepuff: 'bg-yellow-50 border-yellow-900/20',
    Accessible: 'bg-white border-black/20'
  }

  const labelStyles: Record<Theme, string> = {
    Gryffindor: 'text-red-900',
    Slytherin: 'text-green-900',
    Ravenclaw: 'text-blue-900',
    Hufflepuff: 'text-yellow-900',
    Accessible: 'text-black'
  }

  const inputStyles: Record<Theme, string> = {
    Gryffindor: 'text-red-900 border-red-900/30 focus:border-yellow-500 focus:ring-yellow-500/50 placeholder-red-900/40',
    Slytherin: 'text-green-900 border-green-900/30 focus:border-gray-400 focus:ring-gray-400/50 placeholder-green-900/40',
    Ravenclaw: 'text-blue-900 border-blue-900/30 focus:border-blue-400 focus:ring-blue-400/50 placeholder-blue-900/40',
    Hufflepuff: 'text-yellow-900 border-yellow-900/30 focus:border-yellow-600 focus:ring-yellow-600/50 placeholder-yellow-900/40',
    Accessible: 'text-black border-black focus:border-black focus:ring-black placeholder-gray-600'
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

  return (
    <section
      className={`p-8 rounded-lg shadow-lg border flex flex-col justify-center transition-colors duration-300 ${sectionStyles[theme]}`}>
      <div className="relative w-full">
        <label
          htmlFor={props.id}
          className={`block font-cinzel font-semibold mb-2 pl-2 transition-colors duration-300 ${labelStyles[theme]}`}
        >
          {props.label}
        </label>

        <input
          type={props.type || 'text'}
          id={props.id}
          value={input}
          onChange={handleInputChange}
          placeholder={props.placeholder}
          className={`w-full px-6 py-3 bg-stone-100 rounded-full shadow-inner focus:outline-none focus:ring-2 transition-all duration-300 italic ${inputStyles[theme]}`}
        />

        {autocompleteItems.length > 0 && (
          <ul
            className={`absolute z-50 w-full mt-2 rounded-xl shadow-lg border max-h-60 overflow-y-auto transition-colors duration-300 ${dropdownStyles[theme]}`}>
            {autocompleteItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleAutocompleteSelect(item)}
                className={`px-6 py-3 cursor-pointer transition-colors duration-200 border-b border-stone-100 last:border-b-0 ${listItemHoverStyles[theme]}`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default AutocompleteCharacter