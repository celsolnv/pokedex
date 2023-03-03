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
      <ul className="inline-flex items-center -space-x-px">
        <li onClick={() => { setCurrentPage(currentPage - 1) }}>
          <a href="#" className="previous-pagination ml-0 rounded-l-lg">
            <PreviousContent />
          </a>
        </li>

        {
          // Array(amountPages).fill('').map((item, index) =>
          Array(5).fill('').map((item, index) =>
            <li key={index} onClick={() => { setCurrentPage(currentPage + index) }}>
              <a
                className={`number ${(currentPage + index) === currentPage && 'number-active'}`}>{currentPage + index}</a>
            </li>

          )}
        <li onClick={() => { setCurrentPage(currentPage + 1) }}>
          <a className="rounded-r-lg next-pagination">
            <NextContent />
          </a>
        </li>
      </ul>

    </nav>
  )
}

const PreviousContent = (): JSX.Element => (
  <>
    <span className="sr-only">Previous</span>
    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
  </>
)
const NextContent = (): JSX.Element => (
  <>
    <span className="sr-only">Next</span>
    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
  </>
)
