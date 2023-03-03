import { Dispatch, SetStateAction, useEffect } from 'react'
import { usePokemon } from '@/hook/usePokemon'
import './style.css'

interface IPaginationParams {
  amountPages: number
  pageLimit: number
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>

}

export function Pagination ({ amountPages, pageLimit, currentPage, setCurrentPage }: IPaginationParams): JSX.Element {
  // const [] = usePokemon()
  const { fetchPokemon } = usePokemon(pageLimit)
  useEffect(() => {
    void fetchPokemon(currentPage)
  }, [currentPage])

  return (
    <nav aria-label="Page navigation example" className='footer'>
      <ul className="inline-flex -space-x-px">

        {
        // Array(amountPages).fill('').map((item, index) =>
        Array(5).fill('').map((item, index) =>
          <li key={index} onClick={() => { setCurrentPage(index + 1) }}>
            <a className="number">{index + 1}</a>
          </li>

        )}

      </ul>
    </nav>
  )
}
