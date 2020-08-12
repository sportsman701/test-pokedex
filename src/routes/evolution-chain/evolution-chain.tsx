import React, { useEffect, useCallback, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from "react-router";
import{ createStructuredSelector } from 'reselect'
import startCase from 'lodash/startCase'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import RequestStatus from 'components/request-status'
import { DispatchProp, EvolutionChain } from 'types'
import { GET_POKEMON_EVOLUTION_CHAIN, getPokemonEvolutionChain } from 'store/modules/pokemon'
import { dataSelector } from 'store/modules/api'
import { parseGender } from 'helpers';
import './style.scss'

interface Props extends RouteComponentProps {
  getPokemonEvolutionChain: DispatchProp<EvolutionChain>
  evolutionChain: EvolutionChain
}

const EvolutionChain: React.FC<Props> = ({
  getPokemonEvolutionChain,
  evolutionChain,
  history,
  match
}) => {
  const id = (match.params as any).id
  const handleBackClick = () => history.goBack()
  
  useEffect(() => {
    getPokemonEvolutionChain({ id })
  }, [])

  const detailKeys = useCallback(evolutionDetail => {
    if (!evolutionDetail) {
      return []
    }
    return Object.keys(evolutionDetail).filter(key => typeof(evolutionDetail[key]) !== 'object')
  }, [evolutionChain])

  return (
    <div className='EvolutionChain'>
      <Button onClick={handleBackClick}>
        &#12296; Back
      </Button>
      
      <p className='my-5'>
        <strong>Evolution Chain</strong>
      </p>
      
      <RequestStatus
        apiRequestSelector={GET_POKEMON_EVOLUTION_CHAIN}
        failMessage={`Evolution chain ${id} is not available`}
      />
      
      {evolutionChain && (
        <Table>
          <tbody>
            <tr>
              <td>Baby</td>
              <td>{evolutionChain.is_baby.toString()}</td>
            </tr>
            <tr>
              <td>Species</td>
              <td>
                <Link to={`/pokemon/${evolutionChain.species.name}`}>
                  {evolutionChain.species.name}
                </Link>
              </td>
            </tr>
            <tr>
              <td>Evolves to</td>
              <td>
                {evolutionChain.evolves_to.map((evolveTo, key) => (
                  <Fragment key={key}>
                    <Link to={`/pokemon/${evolveTo.species.name}`} key={key}>
                      {evolveTo.species.name}
                    </Link>
                    <br />
                  </Fragment>
                ))}
              </td>
            </tr>
            {evolutionChain.evolution_details.map((evolutionDetail, key) => (
              <Fragment key={key}>
                <tr>
                  <td colSpan={2}>Evolution Details {key + 1}</td>
                </tr>
                {detailKeys(evolutionDetail).map((key: string) => (
                  <tr key={key}>
                    <td>{startCase(key)}</td>
                    <td>
                      {key === 'gender' ? parseGender((evolutionDetail as any)[key])
                        : (evolutionDetail as any)[key].toString()}
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

const selectors = createStructuredSelector({
  evolutionChain: (state: any, { match }: Props) =>
    dataSelector(`${GET_POKEMON_EVOLUTION_CHAIN}/${(match.params as any).id}`)(state),
})

const actions = {
  getPokemonEvolutionChain
}

export default compose(
  withRouter,
  connect(selectors, actions)
)(EvolutionChain)