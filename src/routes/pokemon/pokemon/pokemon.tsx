import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import{ createStructuredSelector } from 'reselect'
import { withRouter, RouteComponentProps } from "react-router";
import cn from 'classnames'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Ability from '../ability'
import Sprites from '../sprites'
import Variety from '../variety'
import Location from '../location'
import Evolution from '../evolution'
import Move from '../move'
import Type from '../type'
import RequestStatus from 'components/request-status'
import { Pokemon as PokemonType, DispatchProp } from 'types'
import { pokemonSelector, isRequestPending } from 'store/modules/pokemon'
import { getPokemon } from 'store/modules/pokemon'
import './style.scss'

interface Props extends RouteComponentProps {
  pokemon: PokemonType
  getPokemon: DispatchProp
  className?: string
}

const Pokemon: React.FC<Props> = ({ match, getPokemon, pokemon, className }) => {
  const name = (match.params as any).name

  useEffect(() => {
    getPokemon({ name })
  }, [match.params])


  return (
    <div className={cn('Pokemon', className)}>
      <RequestStatus
        apiRequestSelector={isRequestPending}
        failMessage={`Pokemon ${name} is not available`}
      />
      {pokemon && (
        <Row className='Pokemon__Tables'>
          {pokemon.sprites && pokemon.evolutions && pokemon.evolutions[0].color && (
            <Col xs={12} className='Pokemon__Sprites'>
              <Sprites
                sprites={pokemon.sprites}
                color={pokemon.evolutions[0].color}
                gender={pokemon.gender}
                className='Pokemon__Section'
              />
            </Col>
          )}
          {pokemon.abilities && (
            <Col md={4} className='Pokemon__Ability'>
              <Ability data={pokemon.abilities} className='Pokemon__Section' />
            </Col>
          )}
          {pokemon.types && (
            <Col md={4} className='Pokemon__Type'>
              <Type data={pokemon.types} className='Pokemon__Section' />
            </Col>
          )}
          {pokemon.evolutions && pokemon.evolutions[0].varieties && (
            <Col md={4} className='Pokemon__Variety'>
              <Variety data={pokemon.evolutions[0].varieties} className='Pokemon__Section' />
            </Col>
          )}
          {pokemon.locations && (
            <Col md={5} className='Pokemon__Location'>
              <Location data={pokemon.locations} className='Pokemon__Section' />
            </Col>
          )}
          {pokemon.evolutions && (
            <Col md={5} className='Pokemon__Evolution'>
              <Evolution data={pokemon.evolutions} className='Pokemon__Section' />
            </Col>
          )}
          {pokemon.moves && (
            <Col xs={12} className='Pokemon__Move'>
              <Move data={pokemon.moves} columns={4} className='Pokemon__Section' />
            </Col>
          )}
        </Row>
      )}
    </div>
  )
}

const selectors = createStructuredSelector({
  pokemon: (state: any, { match }: Props) =>
    pokemonSelector((match.params as any).name)(state)
})

const actions = {
  getPokemon
}

export default compose(
  withRouter,
  connect(selectors, actions)
)(Pokemon)
