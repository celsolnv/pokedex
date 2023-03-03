import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Header, Pagination, PokemonCard, Loading } from '@/components'
import { usePagination } from '@/hook/usePagination'
import { usePokemon } from '@/hook/usePokemon'
import { IPokemon } from '@/services/api/interfaces'

export function Home (): JSX.Element {
  const amountPokemonsInPage = 12
  const [pokemonsDetails, setPokemonsDetails] = useState([] as IPokemon[])
  const { fetchPokemon } = usePokemon(amountPokemonsInPage)
  const { currentPage, setCurrentPage } = usePagination()
  const [amountPages, setAmountPages] = useState(0)
  const pokemonQuery = useQuery(['pokemon', currentPage], async () => { return await fetchPokemon(currentPage) },
    { staleTime: 1000 * 60 * 1 }) // 2 minute

  useEffect(() => {
    if (pokemonQuery.isSuccess) {
      if (pokemonQuery.data.pokemons.results.length == 0) {
        setCurrentPage(1)
        return
      }
      const pokemonsResponse = pokemonQuery.data.pokemons
      const pokemonsDetailsResponse = pokemonQuery.data.pokemonDetails
      setAmountPages(Math.round(pokemonsResponse.count / amountPokemonsInPage))
      setPokemonsDetails(pokemonsDetailsResponse)
    }
  }, [pokemonQuery])

  return (
    <div>
      <Header />
      <div className="flex justify-center flex-wrap ">
        { (pokemonQuery.isLoading || pokemonsDetails.length === 0)
          ? <Loading/>
          : pokemonsDetails.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
          ))}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} amountPages={amountPages} />

    </div>
  )
}
