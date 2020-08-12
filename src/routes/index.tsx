import React, { Fragment } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { history } from 'store'
import Search from './components/search'
import History from './components/history'
import Pokemon from './pokemon'
import EvolutionChain from './evolution-chain'

const Routes: React.FC = () => (
  <Container fluid>
    <Router history={history}>
      <Search />
      <Row>
        <Col lg={2} className='order-lg-2'>
          <History />
        </Col>
        <Col lg={10} className='order-lg-1'>
          <Switch>
            <Route path='/pokemon/:name' component={Pokemon} />
            <Route path='/evolution-chain/:id' component={EvolutionChain} />
            <Redirect to='/' />
          </Switch>
        </Col>
      </Row>
    </Router>
  </Container>
)

export default Routes
