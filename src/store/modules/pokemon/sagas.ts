import { takeLatest, all, put, call } from 'redux-saga/effects'
import {
  getPokemonSpecies as getPokemonSpeciesAction,
  getPokemonLocations as getPokemonLocationsAction,
  getPokemonEvolutionChain as getPokemonEvolutionChainAction
} from './actions'
import {
  GET_POKEMON,
  GET_POKEMON_SPECIES,
  GET_POKEMON_EVOLUTION_CHAIN,
  GET_POKEMON_LOCATIONS
} from './types'
import { Pokemon, Species, Basic, EvolutionChain, LocationArea, Gender } from 'types'
import { apiCallSaga } from '../api'
import { ApiPayload } from 'types/api'
import { resourceId } from 'helpers'
import store from 'store'

const getPokemonBasic = apiCallSaga<any, Pokemon>({
  type: GET_POKEMON,
  method: 'get',
  url: ({ payload }) => `/pokemon/${payload.name}`,
  selectorKey: GET_POKEMON,
  metaOnSuccess: (res, { payload }) => payload.name,
  payloadOnSuccess: res => ({
    id: res.id,
    name: res.name,
    abilities: res.abilities,
    moves: res.moves.map((move: any) => move.move),
    sprites: res.sprites,
    types: res.types,
    evolutions: [res.species],
    gender: null,
    locations: [{
      name: null,
      url: res.location_area_encounters
    }],
    timestamp: Date.now()
  }),
  success: function* ({ id, evolutions, name }) {
    let species = evolutions[0]
    let current = true

    yield put(getPokemonLocationsAction(<ApiPayload<LocationArea[]>>{ id, name }))

    while (!!species) {
      const id = resourceId(species.url)
      species = <Species>(yield call(getPokemonSpeciesFunc, id, name))
      if (current) {
        const id = resourceId(species.evolution_chain.url)
        yield put(getPokemonEvolutionChainAction(<ApiPayload<EvolutionChain>>{ id, name }))
      }
      species = species.evolves_from_species
      current = false
    }
  }
})

const getPokemonLocations = apiCallSaga<any, LocationArea>({
  type: GET_POKEMON,
  method: 'get',
  url: ({ payload }) => `/pokemon/${payload.id}/encounters`,
  selectorKey: GET_POKEMON_LOCATIONS,
  metaOnSuccess: (res, { payload }) => payload.name,
  payloadOnSuccess: res => res.map((item: any) => item.location_area)
})

const getPokemonSpeciesFunc = (speciesId: string, pokemonName: string) => {
  return new Promise((resolve, reject) => {
    store.dispatch(getPokemonSpeciesAction(<ApiPayload<Species>>{
      id: speciesId,
      name: pokemonName,
      resolve,
      reject
    }))
  })
}

const getPokemonSpecies = apiCallSaga<any, Species>({
  type: GET_POKEMON,
  method: 'get',
  url: ({ payload }) => `/pokemon-species/${payload.id}`,
  selectorKey: GET_POKEMON_SPECIES,
  metaOnSuccess: (res, { payload }) => payload.name,
  payloadOnSuccess: (res, { payload }) => ({
    id: res.id,
    url: `https://pokeapi.co/api/v2/pokemon-species/${payload.id}/`,
    name: res.name,
    is_baby: res.is_baby,
    evolves_from_species: res.evolves_from_species,
    evolution_chain: res.evolution_chain,
    varieties: res.varieties,
    color: res.color
  })
})

const getPokemonEvolutionChain = apiCallSaga<any, EvolutionChain>({
  type: GET_POKEMON,
  method: 'get',
  url: ({ payload }) => `/evolution-chain/${payload.id}`,
  requestSelectorKey: GET_POKEMON_EVOLUTION_CHAIN,
  selectorKey: payload => `${GET_POKEMON_EVOLUTION_CHAIN}/${payload.id}`,
  metaOnSuccess: (res, { payload }) => payload.name,
  payloadOnSuccess: (res, { payload }) => ({
    id: res.id,
    url: `https://pokeapi.co/api/v2/evolution-chain/${payload.id}/`,
    name: null,
    ...res.chain
  })
})

export default function* rootSaga() {
  yield takeLatest(GET_POKEMON, getPokemonBasic)
  yield takeLatest(GET_POKEMON_SPECIES, getPokemonSpecies)
  yield takeLatest(GET_POKEMON_LOCATIONS, getPokemonLocations)
  yield takeLatest(GET_POKEMON_EVOLUTION_CHAIN, getPokemonEvolutionChain)
}
