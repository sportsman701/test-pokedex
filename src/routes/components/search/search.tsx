import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { withRouter, RouteComponentProps } from "react-router";
import cn from 'classnames'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import './style.scss'
import { Link } from 'react-router-dom';

interface Props extends RouteComponentProps {
  className?: string
}

const Search: React.FC<Props> = ({ history, match, location, className }) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const name = (match.params as any).name
  const navbar = location.pathname !== '/'

  useEffect(() => {
    const pokemonUrl = '/pokemon/'
    if (location.pathname.slice(0, pokemonUrl.length) === pokemonUrl) {
      const name = location.pathname.slice(pokemonUrl.length)
      name && setSearchValue(name)
    }
  }, [location.pathname])

  const handleSubmit = (e: FormEvent) => {
    history.push(`/pokemon/${searchValue}`)
    e.preventDefault()
  }

  const handleSearchValueChange =
    (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)

  return (
    <Form
      className={cn(
        'Search mb-5',
        className,
        { 'Navbar': navbar }
      )}
      onSubmit={handleSubmit}
    >
      <Form.Row>
        <Col xs={navbar ? 'auto' : 12}>
          <div className='Search__Logo'>
            <Link to='/'>
              <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1920px-International_Pok%C3%A9mon_logo.svg.png' alt='Pokemon Logo' className='img-fluid' />
            </Link>
          </div>
        </Col>
        <Col xs={navbar ? true : 12}>
          <Form.Control
            autoFocus={true}
            className='Search__Input'
            placeholder='Enter pokemon name and hit Enter'
            autoComplete='off'
            value={searchValue}
            onChange={handleSearchValueChange}
          />
        </Col>
        {!navbar && (
          <Col xs={12}>
            <p className='Search__Greeting text-muted text-center mt-5'>Search your pokemon now</p>
          </Col>
        )}
      </Form.Row>
    </Form>
  )
}

export default withRouter(Search)
