import React from 'react'
import cn from 'classnames'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { Variety as VarietyType } from 'types'
import { resourceId } from 'helpers'
import './style.scss'

interface Props {
  data: VarietyType[]
  className?: string
}

const Ability: React.FC<Props> = ({ data, className }) => {
  return (
    <div className={cn('Variety', className)}>
      <p>
        <strong>Varieties</strong>
      </p>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ pokemon, is_default }, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>
                <Link to={`/pokemon/${pokemon.name}`}>
                  {pokemon.name}
                </Link>
              </td>
              <td>
                {is_default && is_default.toString()}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Ability
