import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Header, Pagination, PokemonCard, Loading, SearchInput } from '@/components'
import { usePagination } from '@/hook/usePagination'
import { usePokemon } from '@/hook/usePokemon'
import { IPokemon } from '@/services/api/interfaces'
import { getAllPokemons, getPokemonDetails } from '@/services/api'

export function Home (): JSX.Element {
  const amountPokemonsInPage = 12
  const [pokemonsDetails, setPokemonsDetails] = useState([] as IPokemon[])
  const [pokemonNameSearch, setPokemonNameSearch] = useState('')
  const { fetchPokemon } = usePokemon(amountPokemonsInPage)
  const { currentPage, setCurrentPage } = usePagination()
  const [amountPages, setAmountPages] = useState(0)
  const pokemonQuery = useQuery(['pokemon', currentPage], async () => { return await fetchPokemon(currentPage) },
    { staleTime: 1000 * 60 * 1 }) // 1 minute
  const allPokemonsQuery = useQuery(['pokemons'], async () => { return await getAllPokemons() },
    { staleTime: 1000 * 60 * 3 }) // 3 minute

  useEffect(() => {
    if (pokemonQuery.isSuccess) {
      if (pokemonQuery.data.pokemons.results.length <= 0) {
        setCurrentPage(1)
        return
      }
      const pokemonsResponse = pokemonQuery.data.pokemons
      const pokemonsDetailsResponse = pokemonQuery.data.pokemonDetails
      setAmountPages(Math.round(pokemonsResponse.count / amountPokemonsInPage))
      setPokemonsDetails(pokemonsDetailsResponse)
    }
  }, [pokemonQuery.dataUpdatedAt])

  async function handleSearch (event: React.FormEvent): Promise<void> {
    event.preventDefault()
    if (allPokemonsQuery.isSuccess && pokemonNameSearch.length >= 3) {
      const allPokemons = allPokemonsQuery.data.results
      console.log(allPokemonsQuery)
      console.log(pokemonNameSearch)
      const pokemonFilter = allPokemons.filter(({ name }) => name.includes(pokemonNameSearch.toLowerCase()))
      console.log(pokemonFilter)
      if (pokemonFilter.length > 0) {
        const pokemonDetailFilter = await getPokemonDetails(pokemonFilter)
        setPokemonsDetails(pokemonDetailFilter)
      }
    }
  }
  return (
    <div>
      <Header />
      <div>
        <SearchInput handleSearch={handleSearch} searchValue={pokemonNameSearch} setSearchValue={setPokemonNameSearch}/>
      </div>
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
