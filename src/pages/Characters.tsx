import { useEffect, useState } from 'react'
import '../App.css'
import type ResponseListApi from '../interfaces/ResponseListApi.tsx'
import { getCharactersByHouse } from '../services/CharacterService.tsx'
import { House } from '../enums/HouseEnum.tsx'
import CharacterCard from '../components/cards/CharacterCard.tsx'
import Pagination from '../components/Pagination.tsx'
import Select from '../components/Select.tsx'

function Characters () {
  const [data, setData] = useState<ResponseListApi>()
  const [selectHouse, setSelectHouse] = useState<House | undefined>(undefined)
  const [page, setPage] = useState<number>(1)

  const houseOptions = [
    { value: "", label: "All" },
    { value: House.Gryffindor, label: "Gryffindor" },
    { value: House.Hufflepuff, label: "Hufflepuff" },
    { value: House.Slytherin, label: "Slytherin" },
    { value: House.Ravenclaw, label: "Ravenclaw" }
  ];

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
      <main className="p-8">
        <div className="mb-8 max-w-md mx-auto">
          <Select
              id="house-select"
              label=""
              options={houseOptions}
              value={selectHouse || ""}
              onChange={(e) => {
                const newValue = e.target.value === "" ? undefined : (e.target.value as House);
                setSelectHouse(newValue);
                setPage(1);
              }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {data?.data.map((dataItem) => {
                return (
                    <CharacterCard key={dataItem.id} data={dataItem}/>
                )
              }
          )}
        </div>

        <Pagination
            currentPage={page}
            lastPage={data?.meta?.pagination?.last || data?.meta?.pagination?.current}
            onPageChange={handlePagination}
        />
      </main>
  )
}

export default Characters
