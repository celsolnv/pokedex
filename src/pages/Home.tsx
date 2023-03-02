import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Pagination } from '../components/Pagination'
import { PokemonCard } from '../components/PokemonCard'
import { usePagination } from '../hook/usePagination'
import { usePokemon } from '../hook/usePokemon'
import { getPokemonDetails } from '../services/api'
import { IPokemon } from '../services/api/interfaces'

export default function Home (): JSX.Element {
  const amountPokemonsInPage = 12
  const [pokemonsDetails, setPokemonsDetails] = useState([] as IPokemon[])
  const { fetchPokemon } = usePokemon(amountPokemonsInPage)
  const { currentPage } = usePagination()
  const [amountPages, setAmountPages] = useState(0)

  useEffect(() => {
    // const pokemon = getPokemons(amountPokemonsInPage)
    fetchPokemon(currentPage).then((pokemonsResponse) => {
      setAmountPages(Math.round(pokemonsResponse.count / amountPokemonsInPage))

      const pokemonDetails = getPokemonDetails(pokemonsResponse.results)
      pokemonDetails.then(pokemonResponse => {
        setPokemonsDetails(pokemonResponse)
      }).catch(() => { console.log('error') })
    }).catch(() => { console.log('Error!') })
    // TODO: COMENTAR ESSA FORMULA
  }, [currentPage])

  if (pokemonsDetails.length < 0) {
    return <h2>Carregando...</h2>
  }
  return (
    <div>
      <Header/>
      <div className="flex justify-center flex-wrap ">
        {pokemonsDetails.map(pokemon => (
            <PokemonCard key={pokemon.number} pokemon={pokemon} />
        ))}
      </div>

      <Pagination amountPages={amountPages} pageLimit={amountPokemonsInPage} />

    </div>
  )
}
