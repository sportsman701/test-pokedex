import React from 'react'
import cn from 'classnames'
import Table from 'react-bootstrap/Table'
import { Type } from 'types'
import './style.scss'

interface Props {
  data: Type[]
  className?: string
}

const TypeComponent: React.FC<Props> = ({ data, className }) => {
  return (
    <div className={cn('Type', className)}>
      <p>
        <strong>Types</strong>
      </p>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Slot</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ type, slot }, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{type && type.name}</td>
              <td>{slot}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default TypeComponent
