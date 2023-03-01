import { useNavigate } from 'react-router-dom'
import { IPokemon } from '../../services/api/interfaces'
import './style.css'
import { themeTypePokemon } from './theme'
interface IPokemonCardProps {
  pokemon: IPokemon
}

export function PokemonCard ({ pokemon }: IPokemonCardProps): JSX.Element {
  const navigate = useNavigate()
  const typePokemon = pokemon.types[0].type.name
  let backgroundColor = themeTypePokemon[typePokemon]
  if (!backgroundColor) {
    backgroundColor = '#797979'
  }

  return (
    <div className="card-container" style={{ backgroundColor }} onClick={() => { navigate('/pokemon') }} >

      <div className="description">
        <p className="font-bold capitalize mb-1">
            {pokemon.name}
        </p>
        <div>
            {
              pokemon.types.map((type, index) => (
                <div key={index}>
                  <div className=" type-pokemon capitalize ">
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
  )
}
