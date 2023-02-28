export interface IPokemonsLinks {
  name: string
  url: string
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
}

export interface IPokemon {
  name: string
  number: number
  image: string
  weight: number
  height: number
  baseExp: number
  description: string
}
