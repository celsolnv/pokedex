import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import pokemonContext from '../../context/PokemonContext'
import { IPokemon } from '../../services/api/interfaces'
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
    navigate('/pokemon')
  }

  return (
    <div className='card-container'
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
          <svg className="pokeball" viewBox="0 0 532 512" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="266" cy="256" rx="266" ry="256" fill={backgroundColor} />
            <circle cx="148" cy="251" r="103" fill={backgroundColor} />
            <rect y="230" width="532" height="52" fill={backgroundColor} />
          </svg>
          <img className="image-pokemon" src={pokemon.image} alt="" />
        </div>
      </div>

    </div>
  )
}
