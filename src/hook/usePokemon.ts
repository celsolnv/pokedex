/* eslint-disable no-use-before-define */
import { useState } from 'react';
import { IPokemon, IPokemonsLinks } from '@/services/api/interfaces';
import { getPokemonDetails, getPokemons } from '@/services/api';

interface IUsePokemonReturn {
  fetchPokemon: (page: number) => Promise<IFetchPokemonReturn>;
  pokemon: IPokemonsLinks;
}
interface IFetchPokemonReturn {
  pokemons: IPokemonsLinks;
  pokemonDetails: IPokemon[];
}

export function usePokemon(pageLimit: number): IUsePokemonReturn {
  const [pokemon, setPokemon] = useState({} as IPokemonsLinks);

  async function fetchPokemon(page = 2): Promise<IFetchPokemonReturn> {
    // Formula para encontrar o offset
    let virtualPage = (page - 1) * pageLimit;
    // const virtualPage = ((page - 1) * pageLimit) ? (page - 1) * pageLimit : 0
    if (virtualPage < 0) {
      virtualPage = 0;
    }

    const pokemonsResponse = await getPokemons(pageLimit, virtualPage);

    setPokemon(pokemonsResponse);

    const pokemonDetails = await getPokemonDetails(pokemonsResponse.results);

    return { pokemons: pokemonsResponse, pokemonDetails };
  }

  return {
    fetchPokemon,
    pokemon
  };
}
