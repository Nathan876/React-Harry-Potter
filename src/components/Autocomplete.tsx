import type { Theme } from '../contexts/ThemeContext.tsx'
import type Character from '../interfaces/Character.tsx'
import type Spell from '../interfaces/Spell.tsx'
import type Potion from '../interfaces/Potion.tsx'
import { useTheme } from '../hooks/useTheme.tsx'
import { useState } from 'react'
import { getCharactersForAutocomplete } from '../services/CharacterService.tsx'
import type ResponseListApi from '../interfaces/ResponseListApi.tsx'
import { getSpellsForAutocomplete } from '../services/SpellService.tsx'
import { getPotionsForAutocomplete } from '../services/PotionService.tsx'


interface PropsAutocomplete {
  label: string;
  id: string;
  placeholder?: string;
  type: string;
  onSelect: (item: Character | Spell | Potion) => void;
}

function Autocomplete (props: PropsAutocomplete) {
  const { theme } = useTheme()
  const [input, setInput] = useState('')
  const [autocompleteItems, setAutocompleteItems] = useState<Character[] | Spell[] | Potion[]>([])

  function handleAutocompleteSelect (item: Character | Spell | Potion) {
    setAutocompleteItems([])
    props.onSelect(item)
    setInput('')
  }

  async function handleInputChange (event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setInput(value)

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
    const items = getAutocompleteItems(data!)
    setAutocompleteItems(items!)
  }

  function getAutocompleteItems (data: ResponseListApi): Character[] | Spell[] | Potion[] | undefined {
    if (!data || !data.data) return []
    switch (props.type) {
      case 'spell':
        return data.data.map((item) => item.attributes as Spell)
      case 'potion':
        return data.data.map((item) => item.attributes as Potion)
      case 'character':
        return data.data.map((item) => item.attributes as Character)
    }
  }


  const labelStyles: Record<Theme, string> = {
    Gryffindor: 'text-yellow-400',
    Slytherin: 'text-gray-300',
    Ravenclaw: 'text-bronze-400',
    Hufflepuff: 'text-black',
    Accessible: 'text-black'
  }

  const themeStyles: Record<Theme, string> = {
    Gryffindor: "bg-red-800 text-yellow-400 border-yellow-500 focus:ring-yellow-500/50",
    Slytherin: "bg-green-800 text-gray-300 border-gray-400  focus:ring-gray-400/50",
    Ravenclaw: "bg-blue-900 text-bronze-400 border-blue-400 focus:ring-blue-400/50",
    Hufflepuff: "bg-yellow-500 text-black border-black focus:ring-yellow-600/50",
    Accessible: "bg-white text-black border-black focus:ring-black/50"
  }

  const baseClasses = "mb-8 p-4 rounded-lg text-center flex items-center justify-center"
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
      className={`${baseClasses} ${themeStyles[theme]}`}>
      <div className="relative w-full">
        <label
          htmlFor={props.id}
          className={`block text-left font-cinzel font-semibold mb-2 pl-2 transition-colors duration-300 ${labelStyles[theme]}`}
        >
          {props.label}
        </label>

        <input
          type={props.type || 'text'}
          id={props.id}
          value={input}
          autoComplete="off"
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
                className={`flex items-center px-6 py-3 cursor-pointer transition-colors duration-200 border-b border-stone-100 last:border-b-0 ${listItemHoverStyles[theme]}`}
              >
                {item.image !== null && (<img className="h-10 mr-2 w-auto object-contain drop-shadow-md rounded" src={item.image} alt={item.name}/>)}{item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default Autocomplete