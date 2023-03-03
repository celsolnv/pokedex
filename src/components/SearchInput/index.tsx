import React, { Dispatch, SetStateAction } from 'react'
import './style.css'

interface ISearchInputParams {
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
  handleSearch: any
}

export function SearchInput ({ searchValue, setSearchValue, handleSearch }: ISearchInputParams): JSX.Element {
  return (

    <form className="flex items-center">
      <label htmlFor="simple-search" className="sr-only">Search</label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <InputIcon/>
        </div>
        <input
          type="text"
          id="simple-search"
          className="input"
          placeholder="Search"
          minLength={3}
          value={searchValue}
          onChange={(event) => { setSearchValue(event.target.value) }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              handleSearch()
            }
          }}
          />

      </div>
      <button className="button-search" onClick={handleSearch}>
        <ButtonIcon/>
      </button>
    </form>

  )
}
const ButtonIcon = (): JSX.Element => (<>        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>

<span className="sr-only">Search</span></>)

const InputIcon = (): JSX.Element => (<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>)
