import { useEffect, useState } from 'react'
import '../App.css'
import type ResponseListApi from '../interfaces/ResponseListApi.tsx'
import { getCharactersByHouse } from '../services/CharacterService.tsx'
import { House } from '../Enums/HouseEnum.tsx'
import CharacterCard from '../components/cards/CharacterCard.tsx'
import Button from '../components/Button.tsx'

function Characters () {
  const [data, setData] = useState<ResponseListApi>()
  const [selectHouse, setSelectHouse] = useState<House | undefined>(undefined)
  const [page, setPage] = useState<number>(1)


  function handlePagination (page :number) {
    setPage(page)
  }

  useEffect(() => {
    async function testLoad () {
      const data = await getCharactersByHouse(selectHouse, page)
      setData(data)
    }

    testLoad()
  }, [selectHouse, page])

  return (
    <>
      <select onChange={e => setSelectHouse(e.target.value as House)}>
        <option value={undefined}>Alls</option>
        <option value={House.Gryffindor}>Gryffindor</option>
        <option value={House.Hufflepuff}>Hufflepuff</option>
        <option value={House.Slytherin}>Slytherin</option>
        <option value={House.Ravenclaw}>Ravenclaw</option>
      </select>
      <div className="grid grid-cols-5 gap-4">
        {data?.data.map((dataItem) => {
            return (
              <CharacterCard key={dataItem.id} data={dataItem}/>
            )
          }
        )}
      </div>
      {Array.from({ length: data?.meta?.pagination?.last || data?.meta?.pagination?.current }).map((_, i) => (
        <Button key={i} onClick={() => handlePagination(i+1)}>
          {i + 1}
        </Button>
      ))}
    </>
  )
}


export default Characters
