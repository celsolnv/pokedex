import { IPokemonsLinks } from './../services/api/interfaces'
import { useState } from 'react'
import { getPokemons } from '../services/api'

interface IUsePokemonReturn {
  fetchPokemon: (p: number) => void
  pokemon: IPokemonsLinks[]
}

export function usePokemon (pageLimit: number): IUsePokemonReturn {
  const [pokemon, setPokemon] = useState([] as IPokemonsLinks[])

  function fetchPokemon (page: number): void {
    // TODO: COMENTAR ESSA FORMULA
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const virtualPage = ((page - 1) * pageLimit) ? 0 : (page - 1) * pageLimit

    const pokemons = getPokemons(pageLimit, virtualPage)

    pokemons.then(response => { setPokemon(response) }).catch(() => { console.log('Deu ruim ') })
  }

  return {
    fetchPokemon,
    pokemon
  }
}
