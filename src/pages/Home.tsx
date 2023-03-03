import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
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
  const pokemonQuery = useQuery(['pokemon', currentPage], async () => { return await fetchPokemon(currentPage) }, { staleTime: 1000 * 60 })

  useEffect(() => {
    console.log(pokemonQuery.error)
    console.log(pokemonQuery.status)

    if (pokemonQuery.isSuccess) {
      const pokemonsResponse = pokemonQuery.data.pokemons
      const pokemonsDetailsResponse = pokemonQuery.data.pokemonDetails
      setAmountPages(Math.round(pokemonsResponse.count / amountPokemonsInPage))
      setPokemonsDetails(pokemonsDetailsResponse)
    }
  }, [pokemonQuery.status])

  if (pokemonsDetails.length < 0) {
    return <h2>Carregando...</h2>
  }
  return (
    <div>
      <Header />
      <div className="flex justify-center flex-wrap ">
        {pokemonsDetails.map(pokemon => (
          <PokemonCard key={pokemon.number} pokemon={pokemon} />
        ))}
      </div>

      <Pagination amountPages={amountPages} pageLimit={amountPokemonsInPage} />

    </div>
  )
}
