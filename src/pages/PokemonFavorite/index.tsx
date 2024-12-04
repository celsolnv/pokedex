/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react';
import { Header, Loading, PokemonCard } from '@/components';
import { useLocalStorage } from '@/hook/useLocalStorage';
import { getPokemonDetailsByName } from '@/services/api';
import { IPokemon } from '@/services/api/interfaces';

export function PokemonFavorite(): JSX.Element {
  const [pokemonStorage] = useLocalStorage('pokemons_favorite', []);
  const [pokemonsDetails, setPokemonsDetails] = useState([] as IPokemon[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void getPokemons();
  }, []);

  async function getPokemons(): Promise<void> {
    const pokemonsDetailsPromise = pokemonStorage.map(
      async (pokemonName: string) => {
        return await getPokemonDetailsByName(pokemonName);
      }
    );
    const pokemonsDetailsResponse = await Promise.all(pokemonsDetailsPromise);

    setPokemonsDetails(pokemonsDetailsResponse);
    setIsLoading(false);
  }

  return (
    <>
      <div>
        <Header />
        {isLoading ? (
          <Loading />
        ) : pokemonsDetails.length ? (
          <div className="flex justify-center flex-wrap ">
            {pokemonsDetails.map((pokemon) => (
              <PokemonCard key={pokemon.number} pokemon={pokemon} />
            ))}
          </div>
        ) : (
          <h2> Você não tem nenhum pokemon favorito</h2>
        )}
      </div>
    </>
  );
}
