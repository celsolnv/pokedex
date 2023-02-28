import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { PokemonCard } from './components/PokemonCard'
import { getPokemonDetails, getPokemons } from './services/api'
import { IPokemon } from './services/api/interfaces'

export default function App (): JSX.Element {
  const [pokemons, setPokemons] = useState([] as IPokemon[])

  useEffect(() => {
    const pokemon = getPokemons()

    pokemon.then(pokemonList => {
      const pokemonDetails = getPokemonDetails(pokemonList)
      pokemonDetails.then(pokemonResponse => {
        setPokemons(pokemonResponse)
      }).catch(error => { console.log(error) })
    }).catch(error => { console.log(error) })
  }, [])

  if (pokemons.length < 0) {
    return <h2>Carregando...</h2>
  }
  return (
    <div>
      <Header/>
      <div className="flex justify-start flex-wrap ">
        {pokemons.map(pokemon => (
            <PokemonCard key={pokemon.number} pokemon={pokemon} />
        ))}
      </div>

    </div>
  )
}
