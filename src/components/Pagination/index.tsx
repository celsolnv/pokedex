import { Dispatch, SetStateAction } from 'react'
import { ListItem } from './ListItem'
import './style.css'

interface IPaginationParams {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  amountPages: number

}

export function Pagination ({ amountPages, currentPage, setCurrentPage }: IPaginationParams): JSX.Element {
  const amountPagesItem = 8
  return (
    <nav aria-label="Page navigation example" className='footer'>
      <ul className="inline-flex items-center -space-x-px">
        <li onClick={() => { setCurrentPage(currentPage - 1) }}>
          <a href="#" className="previous-pagination ml-0 rounded-l-lg">
            <PreviousContent />
          </a>
        </li>

        {
          currentPage >= 4 &&
          <>
            <ListItem currentPage={currentPage} pageIndex={1} onClick={() => { setCurrentPage(1) }} />
            <Ellipsis />
          </>
        }

        {
          Array(amountPagesItem).fill('').map((item, index) => {
            let pageIndex = index + currentPage
            if (pageIndex + amountPagesItem <= amountPages) {
              return (<ListItem
                key={index}
                currentPage={currentPage}
                pageIndex={pageIndex}
                onClick={() => { setCurrentPage(pageIndex) }}
              />)
            } else {
              pageIndex = amountPages - (amountPagesItem - index) + 1
              return (<ListItem
                key={index}
                currentPage={currentPage}
                pageIndex={pageIndex}
                onClick={() => { setCurrentPage(pageIndex) }}
              />)
            }
          }

          )}

        {
          currentPage < (amountPages - amountPagesItem) &&
          <>
            <Ellipsis />
            <li onClick={() => { setCurrentPage(amountPages) }}>
              <a
                className="number">{amountPages}</a>
            </li>
          </>
        }

        <li onClick={() => { setCurrentPage(currentPage + 1) }}>
          <a className="rounded-r-lg next-pagination">
            <NextContent />
          </a>
        </li>

      </ul>

    </nav>
  )
}

const Ellipsis = (): JSX.Element => (
  <li className='pointer-events-none'>
    <a className="number"> ... </a>
  </li>
)

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
