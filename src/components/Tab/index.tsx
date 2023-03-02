/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState } from 'react'
import { IPokemon } from '../../services/api/interfaces'

import './style.css'

type ITabActive = 'about' | 'base_stats' | 'evolution' | 'moves'

interface ITabParams {
  pokemon: IPokemon
}

export function Tab ({ pokemon }: ITabParams): JSX.Element {
  const [tabActive, setTabActive] = useState<ITabActive>('about')

  function chooseContent (): JSX.Element {
    if (tabActive === 'about') {
      return <TabAboutContent
        abilities={pokemon.abilities}
        weight={pokemon.weight}
        height={pokemon.height}
      />
    } else if (tabActive === 'base_stats') {
      return <TabBaseStatsContent />
    } else if (tabActive === 'evolution') {
      return <TabEvolutionContent />
    } else if (tabActive === 'moves') {
      return <TabMovesContent />
    }
    return (<p> Não encontrado</p>)
  }

  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px" >
          <li className="mr-1" onClick={() => { setTabActive('about') }}>
            <a href="#"
              className={`tab-index-pokemon 
              ${tabActive === 'about' && 'tab-index-pokemon-active'} `} >About</a>
          </li>
          <li className="mr-1" onClick={() => { setTabActive('base_stats') }}>
            <a
              className={`tab-index-pokemon 
              ${tabActive === 'base_stats' && 'tab-index-pokemon-active'} `} >Base Stats</a>
          </li>
          <li className="mr-1" onClick={() => { setTabActive('evolution') }}>
            <a href="#"
              className={`tab-index-pokemon 
              ${tabActive === 'evolution' && 'tab-index-pokemon-active'} `} >Evolution</a>
          </li>
          <li className="mr-1" onClick={() => { setTabActive('moves') }}>
            <a href="#"
              className={`tab-index-pokemon 
              ${tabActive === 'moves' && 'tab-index-pokemon-active'} `} >Moves</a>
          </li>
        </ul>
      </div>
      {chooseContent()}

    </>
  )
}

interface ITabAboutContentParams {
  height: number
  weight: number
  abilities: [
    {
      slot: number
      ability: {
        name: string
        url: string
      }
    }
  ]
}
const TabAboutContent = ({ height, weight, abilities }: ITabAboutContentParams): JSX.Element => {
  return (

    <div>
      <div className='grid grid-cols-2 m-3'>
        <p>Height</p>
        <p>{(height / 10)} cm</p>
      </div>
      <div className='grid grid-cols-2 m-3'>
        <p>Weight</p>
        <p>{(weight / 10)} g</p>
      </div>
      <div className='grid grid-cols-2 m-3'>
        <p>Abilities</p>
        <p>
          {abilities.map(ability => (
            <span className='m-1 capitalize' key={ability.slot}>
              {ability.ability.name},
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
const TabBaseStatsContent = (): JSX.Element => {
  return (
    <p>Em breve Base Stats</p>
  )
}
const TabEvolutionContent = (): JSX.Element => {
  return (
    <p>Em breve Evolution...</p>
  )
}
const TabMovesContent = (): JSX.Element => {
  return (
    <p>Em breve Moves...</p>
  )
}
