import { createAction } from 'redux-actions'

import * as types from './types'

export const getPokemon = createAction(types.GET_POKEMON)

export const getPokemonSpecies = createAction(types.GET_POKEMON_SPECIES)

export const getPokemonEvolutionChain = createAction(types.GET_POKEMON_EVOLUTION_CHAIN)

export const getPokemonLocations = createAction(types.GET_POKEMON_LOCATIONS)
