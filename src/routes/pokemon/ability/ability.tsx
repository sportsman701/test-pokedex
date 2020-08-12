import React from 'react'
import cn from 'classnames'
import Table from 'react-bootstrap/Table'
import { Ability as AbilityType } from 'types'
import './style.scss'

interface Props {
  data: AbilityType[]
  className?: string
}

const Ability: React.FC<Props> = ({ data, className }) => {
  return (
    <div className={cn('Ability', className)}>
      <p>
        <strong>Abilities</strong>
      </p>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Slot</th>
            <th>Hidden</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ ability, slot, is_hidden }, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{ability && ability.name}</td>
              <td>{slot}</td>
              <td>{is_hidden && is_hidden.toString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Ability
