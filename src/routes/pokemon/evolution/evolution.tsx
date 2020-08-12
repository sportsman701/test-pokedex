import React, { Fragment } from 'react'
import cn from 'classnames'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { Species as SpeciesType } from 'types'
import './style.scss'
import { resourceId } from 'helpers'

interface Props {
  data: SpeciesType[]
  className?: string
}

const Evolution: React.FC<Props> = ({ data, className }) => {
  return (
    <div className={cn('Evolution', className)}>
      <p>
        <strong>Evolutions</strong>
      </p>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Baby</th>
            <th>Evolves from</th>
            <th>Varieties</th>
            <th>Color</th>
            <th>Chain</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ name, is_baby, evolves_from_species, varieties, color, evolution_chain }, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{name}</td>
              <td>{is_baby && is_baby.toString()}</td>
              <td>
                {evolves_from_species && (
                  <Link to={`/pokemon/${evolves_from_species.name}`}>
                    {evolves_from_species.name}
                  </Link>
                )}
              </td>
              <td>
                {varieties && varieties.map((variety, key) => (
                  <Fragment key={key}>
                    <Link to={`/pokemon/${variety.pokemon.name}`}>
                      {variety.pokemon.name}
                    </Link>
                    <br />
                  </Fragment>
                ))}
              </td>
              <td>{color && color.name}</td>
              <td>
                {evolution_chain && (
                  <Link to={`/evolution-chain/${resourceId(evolution_chain.url)}`}>Chain</Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Evolution
