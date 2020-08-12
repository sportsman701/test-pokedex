export interface Basic {
  name: string
  url: string
}

export interface Ability {
  is_hidden: boolean
  slot: number
  ability: Basic
}

export interface Type {
  slot: number
  type: Basic
}

export interface Gender {
  id: number
  name: string
  pokemon_species_details: {
    pokemon_species: Species,
    rate: number
  }[]
  required_for_evolution: Species[]
}

export interface Variety {
  is_default: boolean
  pokemon: Basic
}

export type Color = Basic

export type LocationArea = Basic

export type Move = Basic

export interface Sprites {
  back_femail: string
  back_shiny_female: string
  back_default: string
  back_shiny: string
  front_female: string
  front_shiny_female: string
  front_default: string
  front_shiny: string
}

export interface EvolutionChain extends Basic {
  is_baby: boolean
  species: Species
  evolution_details?: any[]
  evolves_to: EvolutionChain[]
}

export interface Species extends Basic {
  id: number
  is_baby: boolean
  evolves_from_species: Species
  varieties: Variety[]
  color: Color
  evolution_chain?: EvolutionChain
}

export interface Pokemon {
  id: number
  name: string
  abilities?: Ability[]
  locations?: LocationArea[]
  moves?: Move[]
  types?: Type[]
  sprites?: Sprites
  evolutions?: Species[]
  gender: string
  timestamp: number
}
