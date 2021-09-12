import React from 'react'
import Styles from './CardWrap.module.css'

const CardWrap = (props) => {
  return (
    <div className={`${Styles.switchCard} ${props.className}`}>
      {props.children}
    </div>
  )
}

export default CardWrap
