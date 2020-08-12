import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import{ createStructuredSelector } from 'reselect'
import Alert from 'react-bootstrap/Alert'
import Loader from 'components/loader'
import { requestStatusSelector, REQUEST_REJECTED, REQUEST_PENDING } from 'store/modules/api'

interface Props {
  apiRequestSelector: string | ((store: any) => string)
  requestStatus: string
  failMessage?: string
}

const RequestStatus: React.FC<Props> = ({
  requestStatus,
  failMessage
}) => (
  <Fragment>
    {requestStatus === REQUEST_PENDING && (
      <Loader />
    )}
    {requestStatus === REQUEST_REJECTED && (
      <Alert className='mt-3' variant='danger'>
        {failMessage || 'No Data Available'}
      </Alert>
    )}
  </Fragment>
)

const selectors = createStructuredSelector({
  requestStatus: (state: any, { apiRequestSelector }: Props) => {
    if (typeof(apiRequestSelector) === 'string') {
      return requestStatusSelector(apiRequestSelector)(state)
    } else {
      return apiRequestSelector(state)
    }
  }
})

export default connect(selectors)(RequestStatus)
