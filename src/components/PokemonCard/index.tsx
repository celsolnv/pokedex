import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import pokemonContext from '../../context/PokemonContext'
import { IPokemon } from '../../services/api/interfaces'
import { Pokeball } from './Pokeball'
import './style.css'
import { themeTypePokemon } from './theme'
interface IPokemonCardProps {
  pokemon: IPokemon
}

export function PokemonCard ({ pokemon }: IPokemonCardProps): JSX.Element {
  const navigate = useNavigate()
  const { setPokemonDetails } = useContext(pokemonContext)
  const typePokemon = pokemon.types[0].type.name
  let backgroundColor = themeTypePokemon[typePokemon]
  if (!backgroundColor) {
    backgroundColor = '#797979'
  }

  function redirectPage (): void {
    setPokemonDetails(pokemon)
    navigate(`/pokemon/${pokemon.name}`)
  }

  return (
    <div className='md:w-[270px] md:h-[200px] md:m-[10px] card-container '
      style={{ backgroundColor }}
      onClick={redirectPage}
      >

      <div className=''>
        <p className="font-bold capitalize pb-1 text-lg ">
            {pokemon.name}
        </p>
      </div>
      <div className="card-info" >
        <div className="description">
          <div>
            {
              pokemon.types.map((type, index) => (
                <div key={index}>
                  <div className=" type-pokemon capitalize text-sm ">
                    <p >{type.type.name}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className='image-container'>
          <Pokeball backgroundColor={backgroundColor} />
          <img className="md:w-[160px]  z-10 w-[80px]" src={pokemon.image} alt="" />
        </div>
      </div>

    </div>
  )
}
