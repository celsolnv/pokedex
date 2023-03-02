import { IPokemonsLinks } from './../services/api/interfaces'
import { useState } from 'react'
import { getPokemons } from '../services/api'

interface IUsePokemonReturn {
  fetchPokemon: (page: number) => Promise<IPokemonsLinks>
  pokemon: IPokemonsLinks
}

export function usePokemon (pageLimit: number): IUsePokemonReturn {
  const [pokemon, setPokemon] = useState({} as IPokemonsLinks)

  async function fetchPokemon (page: number): Promise<IPokemonsLinks> {
    // TODO: COMENTAR ESSA FORMULA
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const virtualPage = ((page - 1) * pageLimit) ? (page - 1) * pageLimit : 0

    const pokemons = await getPokemons(pageLimit, virtualPage)

    setPokemon(pokemons)

    return pokemons
  }

  return {
    fetchPokemon,
    pokemon
  }
}
