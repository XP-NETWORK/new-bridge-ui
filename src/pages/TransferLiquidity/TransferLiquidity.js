// External Imports
import React from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import { Col, Container, Row } from 'react-bootstrap'
// CSS
import Styles from './TransferLiquidity.module.css'
// Local Imports
import CardWrap from '../../UIElemnts/CardWrap'
import SelectItem from '../../UIElemnts/SelectItem'
import TokenBox from '../../UIElemnts/TokenBox'
// SVGs
import userAvatar from '../../assets/images/userAvatar.svg'
import { ReactComponent as RightArrow } from '../../assets/images/rightArrow.svg'
import { ReactComponent as LeftArrow } from '../../assets/images/leftArrow.svg'
// Blockchain Related
import {
  selectFromChain,
  selectToChain,
  selectFromAccount,
  selectToAccount,
  swapChains,
  changeAmount,
  selectCoin,
} from '../../actions'
import { chains, coins, exchangeRates } from '../../config'
import {
  sendTokens,
  returnWrappedTokens,
  getWrappedTokensBalances,
} from '../../thunks'
// import {CHAIN_INFO} from '../../cross_chain/consts';
import { mapChainToAvatar } from '../../mappers'

const TransferLiquidity = ({
  // States
  fromChain,
  toChain,
  fromAccount,
  toAccount,
  amount,
  balances,
  coin,
  fromAccountS,
  toAccountS,

  // Dispatch emitters:
  selectFromChain,
  selectToChain,
  selectFromAccount,
  selectToAccount,
  selectCoin,

  getbalances,
  onSwapChainsPressed,
  onChaneAmount,
  // send,
  // sendWrapped
}) => {
  const fromTranBridge = chains.map((item) => {
    return {
      key: item,
      text: item,
      value: item,
      image: { avatar: true, src: mapChainToAvatar(item) },
    }
  })

  const toTranBridge = fromTranBridge

  const sourceAccounts = fromAccountS.map((item) => {
    return {
      key: item,
      text: item,
      value: item,
      image: { avatar: true, src: userAvatar },
    }
  })

  const targetAccounts = toAccountS.map((item) => {
    return {
      key: item,
      text: item,
      value: item,
      image: { avatar: true, src: userAvatar },
    }
  })

  const tokenBalances = balances.map((item) => {
    return {
      key: coins[chains.indexOf(item[0])],
      text: (
        <TokenBox
          token={coins[chains.indexOf(item[0])]}
          amount={item[1].toString()}
          exchangeRate={exchangeRates[coins[chains.indexOf(item[0])]]}
        />
      ),
      value: coins[chains.indexOf(item[0])],
      image: { avatar: true, src: mapChainToAvatar(item[0]) },
    }
  })

  const switchHandler = (e) => {
    e.preventDefault()
    onSwapChainsPressed()
    getbalances(toChain, toAccount)
  }

  const handleChangeAmount = (e) => {
    e.preventDefault()
    onChaneAmount(e.target.value)
  }

  // const sendAnyToken = () => {

  //     console.log('Send any token');

  //     let func = undefined;

  //     if(coin === coins[chains.indexOf(fromChain)]){
  //         func = send;
  //     }else{
  //         func = sendWrapped;
  //     }

  //     func(
  //         fromChain,
  //         PredefinedAccounts[fromChain][fromAccount].key,
  //         CHAIN_INFO[toChain].nonce,
  //         PredefinedAccounts[toChain][toAccount].account,
  //         amount
  //     )
  // }

  const handleChangeFrom = (e) => {
    e.preventDefault()
    selectFromChain(e.target.innerText)
  }

  const handleChangeTo = (e) => {
    e.preventDefault()
    selectToChain(e.target.innerText)
  }

  const handleChangeFromAcct = (e) => {
    e.preventDefault()
    selectFromAccount(e.target.innerText)
    getbalances(fromChain, e.target.innerText)
  }

  const handleChangeToAcct = (e) => {
    e.preventDefault()
    selectToAccount(e.target.innerText)
  }

  const handleChangeToken = (e) => {
    const txt = e.target.innerText

    if (txt.includes('XPNET')) {
      selectCoin('XPNET')
    }
    if (txt.includes('BNB')) {
      selectCoin('BNB')
    }
    if (txt.includes('eGLD')) {
      selectCoin('eGLD')
    }
    if (txt.includes('HT')) {
      selectCoin('HT')
    }
    if (txt.includes('ETH')) {
      selectCoin('ETH')
    }

    console.log(txt)
  }

  return (
    <Container disabled>
      <div className="title title--primary main-title">
        <h2>
          Cross-Chain Tokens Bridge -{' '}
          <span style={{ color: '#F27603' }}>Coming Soon</span>
        </h2>
      </div>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <div
            id="placeofitem"
            className={`${Styles.switcherWrap} ${
              window.innerWidth < 991 ? '' : 'd-flex'
            } align-items-center justify-content-center`}
          >
            <CardWrap>
              <SelectItem label={'From'} disabled>
                <Dropdown
                  placeholder={'Select option'}
                  fluid
                  selection
                  options={fromTranBridge}
                  onChange={(e) => handleChangeFrom(e)}
                  value={fromChain}
                  disabled
                />
              </SelectItem>
              <SelectItem label={'Source Account'}>
                <Dropdown
                  placeholder="Select option"
                  fluid
                  selection
                  options={sourceAccounts}
                  onChange={(e) => handleChangeFromAcct(e)}
                  value={fromAccount}
                  disabled
                />
              </SelectItem>
              <SelectItem label={'Amount'}>
                <Dropdown
                  placeholder="Select token"
                  fluid
                  selection
                  options={tokenBalances}
                  onChange={handleChangeToken}
                  value={coin}
                  disabled
                />
              </SelectItem>

              <div
                className={`${Styles.amounInput} d-flex align-items-center`}
                style={{ marginTop: '0.6875rem' }}
              >
                <input
                  type="number"
                  className={Styles.inputStyle}
                  value={amount}
                  disabled={false}
                  placeholder={'0.0'}
                  onChange={handleChangeAmount}
                />
              </div>
            </CardWrap>

            <button
              className={`${Styles.switchModeBtn} d-flex flex-column`}
              onClick={switchHandler}
              disabled
            >
              <RightArrow />
              <LeftArrow />
            </button>

            <CardWrap className={'align-self-start'}>
              <SelectItem label={'To'}>
                <Dropdown
                  placeholder="Select option"
                  fluid
                  selection
                  options={toTranBridge}
                  onChange={(e) => handleChangeTo(e)}
                  value={toChain}
                  disabled
                />
              </SelectItem>
              <SelectItem label={'Target Account'}>
                <Dropdown
                  placeholder="Select option"
                  fluid
                  selection
                  options={targetAccounts}
                  onChange={(e) => handleChangeToAcct(e)}
                  value={toAccount}
                  disabled
                />
              </SelectItem>
              <div style={{ marginTop: '0.6875rem' }}>
                <div className={Styles.title}>Amount</div>
                <div
                  className={`${Styles.amounInput} d-flex align-items-center`}
                >
                  <input
                    type="number"
                    className={Styles.inputStyle}
                    value={amount}
                    placeholder={'0.0'}
                    disabled={true}
                  />
                </div>
              </div>

              <div className={Styles.title} style={{ marginTop: '0.6875rem' }}>
                <span>Fee:</span> 0.0%
              </div>
            </CardWrap>
          </div>

          <div className="text-center mt-3 mt-md-4 mb-5">
            <button
              style={{
                opacity: 0.5,
              }}
              className="btnBrand btnBrand--primary btn-disa"
              // onClick={sendAnyToken}
              disabled
            >
              Send
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  fromChain: state.selectReducer.fromChain,
  toChain: state.selectReducer.toChain,

  fromAccount: state.selectReducer.fromAccount,
  toAccount: state.selectReducer.toAccount,

  amount: state.selectReducer.amount,
  balances: state.selectReducer.balances,
  coin: state.selectReducer.coin,
  exchangeRate: state.selectReducer.exchangeRate,

  fromAccountS: state.selectReducer.fromAccountS,
  toAccountS: state.selectReducer.toAccountS,
})

const mapDispatchToProps = (dispatch) => ({
  selectFromChain: (value) => dispatch(selectFromChain(value)),
  selectToChain: (value) => dispatch(selectToChain(value)),
  selectFromAccount: (value) => dispatch(selectFromAccount(value)),
  selectToAccount: (value) => dispatch(selectToAccount(value)),
  selectCoin: (value) => dispatch(selectCoin(value)),

  onSwapChainsPressed: () => dispatch(swapChains()),
  onChaneAmount: (value) => dispatch(changeAmount(value)),
  send: (chain, signer, nonce, to, value) =>
    dispatch(sendTokens(chain, signer, nonce, to, value)),
  sendWrapped: (chain, signer, nonce, to, value) =>
    dispatch(returnWrappedTokens(chain, signer, nonce, to, value)),
  getbalances: (chain, account) =>
    dispatch(getWrappedTokensBalances(chain, account)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TransferLiquidity)
