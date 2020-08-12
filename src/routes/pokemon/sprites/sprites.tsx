import React from 'react'
import cn from 'classnames'
import { Sprites, Color } from 'types'
import startCase from 'lodash/startCase'
import './style.scss'

interface Props {
  sprites: Sprites
  color: Color
  gender: string
  className?: string
}

const spriteNames = [
  'back_default',
  'back_female',
  'back_shiny',
  'back_shiny_female',
  'front_default',
  'front_female',
  'front_shiny',
  'front_shiny_female'
]

const Sprites: React.FC<Props> = ({ sprites, color, gender, className }) => {
  return (
    <div className={cn('Sprites justify-content-center d-flex', className)}>
        <div className='d-flex align-items-center'>
          <span className='Sprites__Color mr-2' style={{ backgroundColor: color.name }} />
          <span>{color.name}</span>
          {gender && <span>, {gender}</span>}
        </div>
        {spriteNames.filter(name => !!(sprites as any)[name]).map(name => (
          <img
            src={(sprites as any)[name]}
            key={name}
            alt={startCase(name)}
            title={startCase(name)}
          />
        ))}
    </div>
  )
}

export default Sprites
