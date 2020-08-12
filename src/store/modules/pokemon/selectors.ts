import fp from 'lodash/fp'
import {
  requestStatusSelector as requestStatusSelector,
  REQUEST_REJECTED,
  REQUEST_PENDING,
  REQUEST_SUCCESS
} from '../api'
import {
  GET_POKEMON,
  GET_POKEMON_SPECIES,
  GET_POKEMON_EVOLUTION_CHAIN,
  GET_POKEMON_LOCATIONS
} from './types'

export const isRequestPending = (state: any) => {
  const status = fp.compose(
    fp.filter(s => s !== 'INIT'),
    fp.map((selector: string) => requestStatusSelector(selector)(state))
  )([
    GET_POKEMON,
    GET_POKEMON_LOCATIONS,
    GET_POKEMON_SPECIES,
    GET_POKEMON_EVOLUTION_CHAIN
  ])
  
  if (status.every(s => s === REQUEST_REJECTED)) {
    return REQUEST_REJECTED
  } else if (status.some(s => s === REQUEST_PENDING)) {
    return REQUEST_PENDING
  } else {
    return REQUEST_SUCCESS
  }
}

export const pokemonSelector = (name: string) =>
  fp.compose(fp.defaultTo(null), fp.get(`pokemon.${name}`))

export const historySelector = fp.compose(fp.map('name'), fp.reverse, fp.sortBy('timestamp'), fp.get('pokemon'))
