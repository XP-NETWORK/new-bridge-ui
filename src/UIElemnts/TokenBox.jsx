import React from 'react'

import Styles from '../pages/TransferLiquidity/TransferLiquidity.module.css'

const TokenBox = (props) => {
  return (
    <div className={Styles.amountOption}>
      <div className="d-flex align-items-center">
        <strong>{props.token}</strong>
        <span className={`${Styles.darkAmount} ml-auto`}>
          ${props.amount * props.exchangeRate}
        </span>
      </div>
      <span>
        {props.amount} {props.token}
      </span>
      <span> @{props.exchangeRate} </span>
    </div>
  )
}

export default TokenBox
