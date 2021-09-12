// External imports
import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
// Internal imports
import TransferNFTSwitcher from './components/TransferNFTSwitcher'
import NFTSourceAccount from './components/NFTSourceAccount'
import { CHAIN_INFO } from '../../cross_chain/consts'
import { PredefinedAccounts } from '../../cross_chain/accounts'
import SelectItem from '../../UIElemnts/SelectItem'
// Images
import Check from '../../assets/images/whitecheck.svg'
import Next from '../../assets/images/transactionhistory.svg'
// Actions & thunks
import {
  sendNFTNative,
  sendNFTForeign,
  listNFTs,
  listNFTNativeChains,
} from '../../thunks'
import { transferNFT, showLoader, setModalMessage } from '../../actions'
import { remoteNFTMeta } from '../../singletons'

const TransferNFT = ({
  fromChain,
  fromAcct,
  toChain,
  toAcct,
  loader,
  sendNative,
  sendWrapped,
  getNfts,
  showLoader,
  modalMessage,
  closePopup,
}) => {
  const [isMultiChain, setIsMultiChain] = useState()
  const [nft, setNft] = useState(undefined)
  const dispatch = useDispatch()
  const [loadingInterval, setLoadingInterval] = useState()
  const [n, setN] = useState(6)

  useEffect(() => {
    setNft()
    const name =
      typeof fromAcct === 'string'
        ? fromAcct.replace(/(?:\r\n|\r|\n)/g, '')
        : ''
    if (
      PredefinedAccounts &&
      PredefinedAccounts[fromChain] &&
      PredefinedAccounts[fromChain][name]
    ) {
      getNfts(fromChain, PredefinedAccounts[fromChain][name].account)
    }
  }, [fromChain, fromAcct, getNfts])

  const setLoader = (isMultiChain) => {
    closePopup()
    if (loadingInterval) clearInterval(loadingInterval)
    let i = 6
    let count = 0
    const l = setInterval(() => {
      count += 0.1
      if (isMultiChain) {
        if (i < 60) i += 0.5
        else if (i < 85) i += 0.3
        else i += 0.03
      } else if (
        fromChain === 'Ropsten' ||
        fromChain === 'BSC' ||
        toChain === 'Ropsten'
      ) {
        if (i < 60) i += 0.5
        else if (i < 85) i += 0.1
        else i += 0.05
      } else {
        if (i < 60) i += 1
        else if (i < 85) i += 0.5
        else i += 0.1
      }

      setN(i > 100 ? 100 : i)
      if (count > 400) {
        dispatch(showLoader(false))
      }
    }, 100)
    setLoadingInterval(l)
  }

  useEffect(() => {
    if (!loader) {
      setN(6)
      clearInterval(loadingInterval)
    }
  }, [loader])

  const handleSenNFTClick = async () => {
    if (!loader && nft) {
      const { originChain } = nft
      const isMultiChain = !(
        nft.originChain === fromChain || originChain === toChain
      )
      setIsMultiChain(isMultiChain)
      showLoader(true)
      setLoader(isMultiChain)
      if (originChain === fromChain) {
        await sendNative(
          fromChain,
          PredefinedAccounts[fromChain][fromAcct].key,
          CHAIN_INFO[toChain].nonce,
          PredefinedAccounts[toChain][toAcct].account,
          nft
        )
      } else {
        if (originChain === toChain) {
          // send nft back to its origin chain
          await sendWrapped(
            fromChain,
            PredefinedAccounts[fromChain][fromAcct].key,
            CHAIN_INFO[toChain].nonce,
            PredefinedAccounts[toChain][toAcct].account,
            nft
          )
        } else {
          // send nft back to its origin chain then to target chain

          const nativeAccount =
            PredefinedAccounts[originChain][
              Object.keys(PredefinedAccounts[originChain])[0]
            ]
          await sendWrapped(
            fromChain,
            PredefinedAccounts[fromChain][fromAcct].key,
            CHAIN_INFO[originChain].nonce,
            nativeAccount.account,
            nft,
            true
          )
          // fetch nfts to get nfts new hash(contract)
          let i = 0
          const sentNFT = await getNFT(
            originChain,
            nativeAccount.account,
            nft,
            i
          )

          await sendNative(
            originChain,
            nativeAccount.key,
            CHAIN_INFO[toChain].nonce,
            PredefinedAccounts[toChain][toAcct].account,
            sentNFT
          )
          setIsMultiChain(false)
        }
      }
      setIsMultiChain(false)
    }
  }

  const getNFT = async (originChain, account, nft, retries) => {
    const dbList = await remoteNFTMeta.getAll()
    const nfts = await listNFTNativeChains(originChain, account, dbList)
    const sentNFT = nfts.filter((n) => n.id === nft.id)[0]
    if (sentNFT) return sentNFT
    else {
      retries++
      if (retries > 15) return false
      return await getNFT(originChain, account, nft, retries)
    }
  }

  const bigLoad = loader
  return (
    <Container>
      <div className="title title--primary main-title">
        <h2>Cross Chain NFT Bridge</h2>
      </div>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <TransferNFTSwitcher setNft={setNft} />
          <NFTSourceAccount nft={nft} selectCb={(data) => setNft(data)} />

          <div className="text-center mt-3 mt-md-4 mb-5">
            <button
              className={` ${loader ? 'interacted-button ' : ''} ${
                nft
                  ? 'btnBrand btnBrand--primary mainBtn '
                  : 'btnBrand btnBrand--primary mainBtn disable-nft-button'
              } ${modalMessage ? 'disable-nft-button-Successfully' : ''}`}
              onClick={handleSenNFTClick}
              style={{
                backgroundColor: bigLoad ? '#041032' : '',
                color: bigLoad ? '#FFFFFF' : '',
                borderColor: bigLoad ? '#041032' : '',
              }}
            >
              {bigLoad ? (
                <div
                  style={{
                    width: n + '%',
                    borderRadius: n > 90 ? '16px' : '',
                  }}
                  className="loading-bar-el "
                ></div>
              ) : (
                ''
              )}
              <p className="loader-text ">
                {modalMessage ? (
                  <>
                    <img className="check-mark " src={Check} alt="" />{' '}
                    Successfully Sent
                  </>
                ) : loader ? (
                  'Transfering NFTs'
                ) : (
                  'Send NFTs'
                )}
              </p>
            </button>

            {fromChain === 'Elrond' ? (
              <SelectItem
                label={
                  loader
                    ? 'Transfering NFTs from Elrond Testnet may take over 30 seconds'
                    : ''
                }
              />
            ) : isMultiChain ? (
              <SelectItem label={loader ? '' : ''} />
            ) : (
              ''
            )}
          </div>
          <div className="transaction-message">
            {modalMessage ? (
              <a target="_blank" href={modalMessage} rel="noreferrer">
                View transaction <img src={Next} alt="" />
              </a>
            ) : (
              ''
            )}
          </div>
        </Col>
      </Row>
      {/* <XpModal handleClose={closePopup} show={modalMessage ? true : false} >
            <CardWrap className={"mx-md-2 my-2 successModal"}>
                <a target="_blank" href={modalMessage}>View Transaction</a>
            </CardWrap>
            </XpModal> */}
    </Container>
  )
}

const mapStateToProps = (state) => ({
  fromChain: state.selectReducer.fromChain,
  fromAcct: state.selectReducer.fromAccount,
  toChain: state.selectReducer.toChain,
  toAcct: state.selectReducer.toAccount,
  modalMessage: state.selectReducer.modalMessage,
  loader: state.selectReducer.loader,
})

const mapDispatchToProps = (dispatch) => ({
  transferNFT: () => dispatch(transferNFT()),
  sendNative: (chain, sender, nonce, to, id) =>
    dispatch(sendNFTNative(chain, sender, nonce, to, id)),
  sendWrapped: (chain, sender, nonce, to, id, keepLoader) =>
    dispatch(sendNFTForeign(chain, sender, nonce, to, id, keepLoader)),
  getNfts: (chain, owner) => dispatch(listNFTs(chain, owner)),
  showLoader: (show) => dispatch(showLoader(show)),
  closePopup: (e) => dispatch(setModalMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TransferNFT)
