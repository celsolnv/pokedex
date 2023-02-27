import { useEffect, useState } from 'react'
import { Header } from './components/Header'
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
      <Header/>
      <div className="flex justify-start flex-wrap ">
        {pokemons.map(pokemon => (
          <div
            key={pokemon.number}
            className="
              w-50 h-50 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700
              flex flex-col items-center m-1 p-5
              "
          >
            <a href="#">
                <img className="w-24 h-24 " src={pokemon.image} alt="" />
            </a>
            <div className="">
                <p className=" font-normal text-gray-700 dark:text-gray-400">
                  {pokemon.name}
                </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
