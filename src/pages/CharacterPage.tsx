import { getCharacterById } from '../services/CharacterService.tsx'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import type Character from '../interfaces/Character.tsx'

export function CharacterPage () {
  const { id } = useParams()
  const [character, setCharacter] = useState<Character>()

  async function loadCharacter () {
    const data = await getCharacterById(id || '')
    setCharacter(data.data.attributes as Character)
  }

  useEffect(() => {
    loadCharacter()
  }, [])
  return (
    <div className="min-h-screen bg-stone-900 py-10 px-4 font-serif">
      {/* Main Container (Parchment Effect) */}
      <div
        className="max-w-5xl mx-auto bg-[#f4ebd8] shadow-[0_0_50px_rgba(0,0,0,0.5)] border-8 border-double border-stone-800 p-6 md:p-10 relative overflow-hidden">

        {/* Watermark / Background Deco */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <span className="text-9xl">⚡</span>
        </div>

        {/* Header: Name and Aliases */}
        <div className="border-b-2 border-stone-800 pb-6 mb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-stone-900 uppercase tracking-tighter">
            {character?.name}
          </h1>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {character?.alias_names?.map((alias: string, $index: number) => (
              <span key={$index} className="bg-stone-800 text-stone-100 px-3 py-1 rounded-full text-sm italic">
            "{alias}"
          </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left Column: Image and Identity */}
          <div className="space-y-6">
            <div className="relative group">
              <img
                src={character?.image || 'https://via.placeholder.com/400x500?text=No+Image'}
                alt={character?.name}
                className="w-full h-auto border-4 border-stone-800 shadow-lg grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            <div className="pt-6 space-y-3 text-stone-800">
              <h3
                className="font-bold border-b border-stone-400 uppercase text-sm tracking-widest">Characteristics</h3>
              <p><span className="font-bold">Species:</span> {character?.species}</p>
              <p><span className="font-bold">Gender:</span> {character?.gender}</p>
              <p><span className="font-bold">Eyes:</span> {character?.eye_color}</p>
              <p><span className="font-bold">Hair:</span> {character?.hair_color}</p>
              <p><span className="font-bold">Height:</span> {character?.height || 'Unknown'}</p>
            </div>
          </div>

          {/* Right Column: Magical and Biographical Details */}
          <div className="md:col-span-2 space-y-8">

            {/* Magic Section */}
            <section className="bg-stone-800/5 p-4 border border-stone-300 rounded">
              <h2 className="text-2xl font-bold text-stone-900 mb-4 border-b-2 border-stone-800 inline-block">Magical
                Profile</h2>
              <div>
                <p><span className="font-bold text-stone-700">Patronus:</span> {character?.patronus || 'Unknown'}</p>
                <p><span className="font-bold text-stone-700">Boggart:</span> {character?.boggart || 'Unknown'}</p>
                <p><span className="font-bold text-stone-700">Animagus:</span> {character?.animagus || 'None'}</p>
                <p><span className="font-bold text-stone-700">Blood Status:</span> {character?.blood_status}</p>
                <p><span className="font-bold text-stone-700">House:</span> {character?.house || 'None'}</p>
              </div>
              <div>
                <p className="font-bold text-stone-700">Wand(s)</p>
                <ul className="list-disc list-inside">
                  {character?.wands?.length > 0 ? character?.wands.map((w: string, $index: number) => <li
                      key={$index}>{w}</li>) :
                    <li>Unknown</li>}
                </ul>
              </div>
            </section>

            {/* Biography Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <section>
                <h3 className="font-bold text-stone-900 uppercase text-sm border-b border-stone-800 mb-2">Titles &
                  Roles</h3>
                <ul className="space-y-1 italic text-stone-800">
                  {character?.titles?.map((title: string, $index: number) => <li key={$index}>• {title}</li>)}
                  {character?.jobs?.map((job: string, $index: number) => <li key={$index}>• {job}</li>)}
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-stone-900 uppercase text-sm border-b border-stone-800 mb-2">Family &
                  Relationships</h3>
                <div className="text-sm space-y-2">
                  <p><span className="font-bold">Members:</span> {character?.family_members?.join(', ')}</p>
                  <p><span className="font-bold">Romances:</span> {character?.romances?.join(', ')}</p>
                </div>
              </section>
            </div>

            {/* Vital Info & Wiki */}
            <div className="flex flex-wrap justify-between items-end pt-6 border-t border-stone-400">
              <div className="text-xs text-stone-600">
                <p>Born: {character?.born || 'N/A'}</p>
                <p>Died: {character?.died || 'N/A'}</p>
              </div>
              <a
                href={character?.wiki}
                target="_blank"
                rel="noreferrer"
                className="bg-stone-900 text-stone-100 px-6 py-2 hover:bg-stone-700 transition-colors uppercase tracking-widest text-sm"
              >
                Check the Wiki ↗
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterPage