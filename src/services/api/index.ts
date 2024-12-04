import axios from 'axios';
import { IPokemon, IPokemonPrevious, IPokemonsLinks } from './interfaces';
const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
});

export async function getPokemons(
  limit = 50,
  offset = 0
): Promise<IPokemonsLinks> {
  const pokemons = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return pokemons.data;
}
export async function getAllPokemons(): Promise<IPokemonsLinks> {
  const pokemons = await api.get('/pokemon?limit=100000&offset=0');
  return pokemons.data;
}
export async function getPokemonDetails(
  pokemonList: IPokemonPrevious[]
): Promise<IPokemon[]> {
  const pokemonsPromise = pokemonList.map(async (pokemon) => {
    const pokemonCharacter = await axios.get(pokemon.url);
    const infoPokemon = pokemonCharacter.data;
    const pokemonFormate = {
      ...infoPokemon,
      image: infoPokemon.sprites.other.dream_world.front_default
    };
    return pokemonFormate;
  });

  return await Promise.all(pokemonsPromise);
}

export async function getPokemonDetailsByName(name: string): Promise<IPokemon> {
  const infoPokemon = await api.get(`/pokemon/${name}`);
  const pokemonFormate = {
    ...infoPokemon.data,
    image: infoPokemon.data.sprites.other.dream_world.front_default
  };

  return pokemonFormate;
}
