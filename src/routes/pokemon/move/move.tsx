import React, { useCallback } from 'react'
import cn from 'classnames'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import startCase from 'lodash/startCase'
import chunk from 'lodash/chunk'
import { Move as MoveType } from 'types'
import './style.scss'

interface Props {
  data: MoveType[]
  className?: string
  columns?: number
}

const Move: React.FC<Props> = ({ data, columns: columnCnt, className }) => {
  const columns = columnCnt || 1
  const rows = Math.ceil(data.length / columns)
  const chunks = useCallback(() => chunk(data, rows), [data, rows])

  return (
    <div className={cn('Move', className)}>
      <p>
        <strong>Moves</strong>
      </p>
      <Row>
        {chunks().map((chunk, col) => (
          <Col md key={col}>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {chunk.map(({ name }, row) => (
                  <tr key={row}>
                    <td>{col * rows + row + 1}</td>
                    <td>{startCase(name)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Move
