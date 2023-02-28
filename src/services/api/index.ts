import axios from 'axios'
import { IPokemon, IPokemonCharacter, IPokemonPrevious, IPokemonsLinks } from './interfaces'
const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
})

export async function getPokemons (limit = 50, offset = 0): Promise<IPokemonsLinks> {
  const pokemons = await api.get(`/pokemon?limit=${limit}&offset=${offset}`)
  return pokemons.data
}
export async function getPokemonDetails (pokemonList: IPokemonPrevious[]): Promise<IPokemon[]> {
  const pokemonsPromise = pokemonList.map(async (pokemon) => {
    const pokemonCharacter = await axios.get(pokemon.url)
    const infoPokemon: IPokemonCharacter = pokemonCharacter.data
    const pokemonFormate = {
      name: infoPokemon.name,
      number: infoPokemon.id,
      image: infoPokemon.sprites.other.dream_world.front_default,
      weight: infoPokemon.weight,
      height: infoPokemon.height,
      baseExp: infoPokemon.base_experience,
      types: infoPokemon.types
    }
    return pokemonFormate
  })

  return await Promise.all(pokemonsPromise)
}
