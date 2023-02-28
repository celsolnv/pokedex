import axios from 'axios'
import { IPokemon, IPokemonCharacter, IPokemonsLinks } from './interfaces'
const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
})

export async function getPokemons (limit = 50, offset = 0): Promise<IPokemonsLinks[]> {
  const pokemons = await api.get(`/pokemon?limit=${limit}&offset=${offset}`)
  // console.log(pokemons.data.results)
  return pokemons.data.results
}
export async function getPokemonDetails (pokemonList: IPokemonsLinks[]): Promise<IPokemon[]> {
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
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book.  `
    }
    return pokemonFormate
  })

  return await Promise.all(pokemonsPromise)
}
