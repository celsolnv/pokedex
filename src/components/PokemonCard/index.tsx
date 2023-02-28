import { IPokemon } from '../../services/api/interfaces'
import './style.css'

interface IPokemonCardProps {
  pokemon: IPokemon
}

export function PokemonCard ({ pokemon }: IPokemonCardProps): JSX.Element {
  return (
    <div className="card-container" >
      <a href="#">
          <img className="w-24 h-24 " src={pokemon.image} alt="" />
      </a>
      <div>
          <p className=" font-normal text-gray-700 dark:text-gray-400">
            {pokemon.name}
          </p>
      </div>
  </div>
  )
}
