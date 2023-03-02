import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { PokemonCard } from '../../components/PokemonCard'
import { useLocalStorage } from '../../hook/useLocalStorage'
import { getPokemonDetailsByName } from '../../services/api'
import { IPokemon } from '../../services/api/interfaces'

export default function PokemonFavorite (): JSX.Element {
  const [pokemonStorage] = useLocalStorage('pokemons_favorite', [])
  const [pokemonsDetails, setPokemonsDetails] = useState([] as IPokemon[])

  useEffect(() => {
    void getPokemons()
  }, [])

  async function getPokemons (): Promise<void> {
    console.log('Buscando pokemons')
    console.log(pokemonStorage)

    const pokemonsDetailsPromise = pokemonStorage.map(async (pokemonName) => {
      return await getPokemonDetailsByName(pokemonName)
    })
    const pokemonsDetailsResponse = await Promise.all(pokemonsDetailsPromise)
    console.log(pokemonsDetailsResponse)

    setPokemonsDetails(pokemonsDetailsResponse)
  }
  return <>
    <div>
      <Header />
      {
        pokemonsDetails.length
          ? <div className="flex justify-center flex-wrap ">
        {pokemonsDetails.map(pokemon => (
          <PokemonCard key={pokemon.number} pokemon={pokemon} />
        ))}
      </div>
          : <h2> Você não tem nenhum pokemon favorito</h2>
      }

    </div>
  </>
}
