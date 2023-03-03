import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { IPokemon } from '@/services/api/interfaces'

interface IPokemonContextProviderParams {
  children: JSX.Element
}

interface IPokemonContextParams {
  pokemonDetails: IPokemon
  setPokemonDetails: Dispatch<SetStateAction<IPokemon>>

}

const pokemonContext = createContext({} as IPokemonContextParams)

export function PokemonContextProvider ({ children }: IPokemonContextProviderParams): JSX.Element {
  const [pokemonDetails, setPokemonDetails] = useState({} as IPokemon)

  return (
    <pokemonContext.Provider
      value={{ pokemonDetails, setPokemonDetails }}
    >
      {children}
    </pokemonContext.Provider>
  )
}
export default pokemonContext
