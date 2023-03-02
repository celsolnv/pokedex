import './style.css'
import { BiArrowBack } from 'react-icons/bi'
// import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { MdFavorite } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import pokemonContext from '../../context/PokemonContext'
import { getPokemonDetailsByName } from '../../services/api'
import { Tab } from '../../components/Tab'

export default function DetailsPokemon (): JSX.Element {
  const { pokemonDetails, setPokemonDetails } = useContext(pokemonContext)
  const { name: namePokemon } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (Object.keys(pokemonDetails).length === 0) {
      getPokemonDetailsByName(String(namePokemon)).then(response => {
        setPokemonDetails(response)
      }).catch(() => { console.log('Error') })
    }
  }, [])

  if (Object.keys(pokemonDetails).length === 0) {
    return <p>Carregando...</p>
  }
  return (
    <div className="container">
      <div className='p-4'>

        <nav className='flex items-center justify-between flex-wrap mb-3 mt-4'>
          <BiArrowBack size={24} onClick={() => { navigate(-1) }} />
          <MdFavorite size={24} />
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
          <div className="w-40">
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
