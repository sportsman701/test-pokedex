import { handleActions } from 'redux-actions'
import fp from 'lodash/fp'
import { REQUEST_SUCCESS } from '../api/types'
import {
  GET_POKEMON,
  GET_POKEMON_SPECIES,
  GET_POKEMON_EVOLUTION_CHAIN,
  GET_POKEMON_LOCATIONS
} from './types'
import  { Pokemon, Species, LocationArea, RequestSuccessAction, EvolutionChain } from 'types'
import { parseGender } from 'helpers'

export default handleActions({
  [REQUEST_SUCCESS]: (state: any, { payload }: RequestSuccessAction) => {
    const { selectorKey, data, meta: pokemonName } = payload

    switch (selectorKey) {
      case GET_POKEMON:
        return fp.set(pokemonName, <Pokemon>data, state)

      case GET_POKEMON_EVOLUTION_CHAIN:
        const evolutionDetails = (<EvolutionChain>data).evolution_details
        const genders = ['female', 'male', 'genderless']

        if (evolutionDetails && evolutionDetails.length > 0) {
          return fp.set(`${pokemonName}.gender`, parseGender(evolutionDetails[0].gender), state)
        } else {
          return state
        }

      case GET_POKEMON_LOCATIONS:
        return fp.set(`${pokemonName}.locations`, <LocationArea[]>data, state)

      case GET_POKEMON_SPECIES:
        const pokemon = <Pokemon>state[pokemonName]
        const species = <Species>data
        const pos = pokemon.evolutions.findIndex(({ name }) => name === species.name)

        if (pos < 0) {
          return fp.set(`${pokemonName}.evolutions`, pokemon.evolutions.concat([species]), state)
        } else {
          return fp.set(`${pokemonName}.evolutions[${pos}]`, species, state)
        }

      default:
    }

    return state
  }
}, {})
