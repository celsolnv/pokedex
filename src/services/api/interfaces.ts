export interface IPokemonPrevious {
  url: string
  name: string
}
export interface IPokemonsLinks {
  count: number
  results: [
    IPokemonPrevious
  ]
}

export interface IPokemonCharacter {
  name: string
  id: number
  base_experience: number
  weight: number
  height: number
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
    }
  }
  species: {
    url: string
  }
  types: [
    slot: number,
    type: {
      name: string
      url: string
    }
  ]
}

export interface IPokemon {
  name: string
  number: number
  image: string
  weight: number
  height: number
  baseExp: number
  types: [
    {
      slot: number
      type: {
        name: string
        url: string
      }
    }
  ]
  abilities: [
    {
      ability: {
        name: string
        url: string
      }
      slot: number
    }
  ]
  stats: [
    {
      base_stat: number
      stat: {
        name: string
        url: string
      }
    }
  ]
}
