import React from 'react'
import cn from 'classnames'
import Table from 'react-bootstrap/Table'
import { LocationArea } from 'types'
import startCase from 'lodash/startCase'
import './style.scss'

interface Props {
  data: LocationArea[]
  className?: string
}

const Location: React.FC<Props> = ({ data, className }) => {
  return (
    <div className={cn('Location', className)}>
      <p>
        <strong>Locations</strong>
      </p>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ name }, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{startCase(name)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Location
