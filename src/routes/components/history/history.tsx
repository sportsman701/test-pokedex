import React from 'react'
import{ createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { connect } from 'react-redux'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { withRouter, RouteComponentProps } from "react-router";
import { historySelector } from 'store/modules/pokemon'
import './style.scss'

interface Props extends RouteComponentProps{
  data: string[]
  className?: string
}

const History: React.FC<Props> = ({ data, location, className }) =>
  location.pathname !== '/' && (
    <div className={cn('History border rounded p-1 mb-5', className)}>
      <p className='History__Title bg-info text-white px-3 py-2 mb-0 rounded'>
        <strong>Search History</strong>
      </p>
      <div className='p-3'>
        {data.map((item, key) => (
          <div key={key}>
            <Link to={`/pokemon/${item}`}>
              {item}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )

const selectors = createStructuredSelector({
  data: historySelector
})

export default compose(
  withRouter,
  connect(selectors)
)(History)
