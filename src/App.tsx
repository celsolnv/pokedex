import { useEffect, useState } from 'react'
import { getPokemonDetails, getPokemons } from './services/api'
import { type IPokemon } from './services/api/interfaces'

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
      {pokemons.map(pokemon => (
        <ul key={pokemon.number}>
          <li>{pokemon.name}</li>
          <li>{pokemon.baseExp}</li>
          <li>{pokemon.number}</li>
        </ul>
      ))}
    </div>
  )
}
