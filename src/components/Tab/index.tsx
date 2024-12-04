import { useState } from 'react';
import { IPokemon } from '@/services/api/interfaces';

import './style.css';
import { TabItem } from './TabItem';

export type ITabActive = 'about' | 'base_stats' | 'evolution' | 'moves';

interface ITabParams {
  pokemon: IPokemon;
}

export function Tab({ pokemon }: ITabParams): JSX.Element {
  const [tabActive, setTabActive] = useState<ITabActive>('about');

  function chooseContent(): JSX.Element {
    if (tabActive === 'about') {
      return (
        <TabAboutContent
          abilities={pokemon.abilities}
          weight={pokemon.weight}
          height={pokemon.height}
        />
      );
    } else if (tabActive === 'base_stats') {
      return <TabBaseStatsContent pokemon={pokemon} />;
    } else if (tabActive === 'evolution') {
      return <TabEvolutionContent />;
    } else if (tabActive === 'moves') {
      return <TabMovesContent pokemon={pokemon} />;
    }
    return <p> Não encontrado</p>;
  }

  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <TabItem
            tabActive={tabActive}
            setTabActive={setTabActive}
            title="about"
          />
          <TabItem
            tabActive={tabActive}
            setTabActive={setTabActive}
            title="base_stats"
          />
          <TabItem
            tabActive={tabActive}
            setTabActive={setTabActive}
            title="moves"
          />
          <TabItem
            tabActive={tabActive}
            setTabActive={setTabActive}
            title="evolution"
          />
        </ul>
      </div>
      {chooseContent()}
    </>
  );
}

interface ITabAboutContentParams {
  height: number;
  weight: number;
  abilities: [
    {
      slot: number;
      ability: {
        name: string;
        url: string;
      };
    }
  ];
}

const TabAboutContent = ({
  height,
  weight,
  abilities
}: ITabAboutContentParams): JSX.Element => {
  return (
    <div>
      <div className="grid grid-cols-2 m-3">
        <p>Height</p>
        <p>{height / 10} cm</p>
      </div>
      <div className="grid grid-cols-2 m-3">
        <p>Weight</p>
        <p>{weight / 10} g</p>
      </div>
      <div className="grid grid-cols-2 m-3">
        <p>Abilities</p>
        <p>
          {abilities.map((ability) => (
            <span className="m-1 capitalize" key={ability.slot}>
              {ability.ability.name},
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

const TabBaseStatsContent = ({
  pokemon
}: {
  pokemon: IPokemon;
}): JSX.Element => {
  const stats = pokemon.stats.map((item) => {
    return {
      name: item.stat.name,
      value: item.base_stat
    };
  });

  return (
    <div>
      {stats.map((stat, index) => (
        <div key={index} className="grid grid-cols-3 m-3">
          <p className="capitalize">{stat.name}</p>
          <p> {stat.value}</p>
          <div
            style={{ backgroundColor: '#c0c0c0' }}
            className="w-full h-2 rounded-lg"
          >
            <div
              style={{ width: `${stat.value}%`, backgroundColor: '#D17F7F' }}
              className="h-2 rounded-lg"
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TabMovesContent = ({ pokemon }: { pokemon: IPokemon }): JSX.Element => {
  return (
    <div>
      <ul>
        {pokemon.moves.map(({ move }, index) => (
          <li key={index} className="capitalize">
            {move.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const TabEvolutionContent = (): JSX.Element => {
  return <p>Em breve Evolution...</p>;
};
