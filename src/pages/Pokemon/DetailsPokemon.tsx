import { BiArrowBack } from 'react-icons/bi'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import pokemonContext from '../../context/PokemonContext'
import { getPokemonDetailsByName } from '../../services/api'
import { Tab } from '../../components/Tab'
import { useLocalStorage } from '../../hook/useLocalStorage'
import { useQuery } from 'react-query'
import './style.css'
import { chooseBackgroundByTypePokemon } from '../../utils'

export default function DetailsPokemon (): JSX.Element {
  const { pokemonDetails, setPokemonDetails } = useContext(pokemonContext)
  const { name: namePokemon } = useParams()
  const [isFavorite, setIsFavorite] = useState(false)
  const [pokemonsFavorites, setPokemonsFavorites] = useLocalStorage('pokemons_favorite', [])
  const navigate = useNavigate()
  const pokemonQuery = useQuery(['pokemon', namePokemon], async () => await getPokemonDetailsByName(String(namePokemon)))

  useEffect(() => {
    if (pokemonQuery.isSuccess && Object.keys(pokemonDetails)) {
      const response = pokemonQuery.data
      setPokemonDetails(response)
      const checkPokemonFavorite = pokemonsFavorites.find((pokemonName: string) => pokemonName === response.name)
      if (checkPokemonFavorite) {
        setIsFavorite(true)
      }
    }
  }, [pokemonQuery.status])

  function handleSwitchFavorite (): void {
    setIsFavorite(!isFavorite)
    if (!isFavorite) {
      const newPokemonsFavorites = pokemonsFavorites
      newPokemonsFavorites.push(pokemonDetails.name)
      setPokemonsFavorites(newPokemonsFavorites)
    } else {
      const newPokemonsFavorites = pokemonsFavorites.filter((pokemonName: string) => pokemonName !== pokemonDetails.name)

      setPokemonsFavorites(newPokemonsFavorites)
    }
  }

  if (Object.keys(pokemonDetails).length === 0) {
    return <p>Carregando...</p>
  }
  const typePokemon = pokemonDetails.types[0].type.name
  const backgroundColor = chooseBackgroundByTypePokemon(typePokemon)
  return (
    <div className="text-white" style={{ backgroundColor }}>
      <div className='p-4'>

        <nav className='flex items-center justify-between flex-wrap mb-3 mt-4'>
          <BiArrowBack size={24} onClick={() => { navigate(-1) }} />
          {
            isFavorite
              ? <MdFavorite size={24} onClick={handleSwitchFavorite} />
              : <MdFavoriteBorder size={24} onClick={handleSwitchFavorite} />
          }
        </nav>

        <div className="flex justify-between items-center ">
          <div>
            <h2 className="font-bold text-4xl capitalize">{pokemonDetails.name}</h2>
            <div className="flex flex-wrap">
              {pokemonDetails.types.map(type => (
                <div key={type.slot} className='pr-1'>
                  <div className="type-pokemon capitalize ">
                    <p className='text-base' >{type.type.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='pb-3'>
            <p className='text-sm font-bold'>{pokemonDetails.number}</p>
          </div>

        </div>

        <div className='flex w-full justify-center pt-5'>
          <div className="w-40 md:w-64">
            <img src={pokemonDetails.image} alt="image of pokemon" />
          </div>
        </div>

      </div>
      <div className="h-full w-full attribute bg-white text-black rounded-lg z-10 p-2 ">
          <Tab pokemon={pokemonDetails} />
      </div>

    </div>
  )
}
