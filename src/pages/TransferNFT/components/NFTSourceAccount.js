// External Imports
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Image } from 'react-bootstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import IIcon from '../../../assets/images/i-icon.svg'
// Internal Imports
import Styles from './NFTSourceAccount.module.css'
// Custom Components
import CardWrap from '../../../UIElemnts/CardWrap'
import XpModal from '../../../UIElemnts/XpModal'
import Loader from '../../../global/Loader/Loader'
import { mapChainToAvatar } from '../../../mappers'
// Images
import userAvatar from '../../../assets/images/userAvatar.svg'
import checkmarkicon from '../../../assets/images/check.svg'
import X from '../../../assets/images/closepopup.svg'
// Actions & thunks
import { selectNFT, setModalMessage } from '../../../actions'

const NFTSourceAccount = ({
  fromAccount,
  selectCb,
  nftList,
  nftLoader,
  nft,
  toChain,
  fromChain,
  loader,
  closePopup,
}) => {
  const [show, setShow] = useState(-1)
  const [copied, setCopied] = useState()
  const handleClose = () => setShow(-1)

  const [users, setUsers] = useState({
    activeMark: null,
    allUsers: nftList,
  })

  useEffect(() => {
    // change the NFT list after sending one
    setCopied(false)
  }, [nftList])

  useEffect(() => {
    if (!loader) setUsers({ ...users, activeMark: undefined })
  }, [loader])

  useEffect(() => {
    setUsers({ ...users, activeMark: undefined })
  }, [fromChain])

  useEffect(() => {
    if (!nft) setUsers({ ...users, activeMark: undefined })
  }, [nft])

  const toggleCheck = (index, data) => {
    closePopup() //Unfreezes the Send NFT buton & removes the TX link

    if (!data.isDisabled) {
      const nIndex = index === users.activeMark ? null : index
      setUsers({ ...users, activeMark: nIndex })
      nIndex !== null ? selectCb(data) : selectCb(undefined)
    }
  }

  const toggleCheckMark = (index) => {
    return index === users.activeMark
  }

  return (
    <CardWrap className={'mx-md-4 my-4 lalalalalala'}>
      <div className={`${Styles.srcAcc} d-flex align-items-center`}>
        <span>NFTs on </span>
        <div className={`${Styles.user} d-flex align-items-center ml-2`}>
          <Image src={userAvatar} />
          <span className="name ml-2">{fromAccount}</span>
        </div>
      </div>

      <div className="d-flex align-items-center flex-wrap">
        {!nftLoader ? (
          nftList && nftList.length > 0 ? (
            nftList
              .map((n) => ({ ...n })) // disable wrapped tokens that are not related to the current chains
              .map((nft, index) => {
                return (
                  <div
                    className={`${Styles.userItem} ${
                      nft.isDisabled ? 'disabled-nft' : ''
                    }`}
                    key={index}
                    onClick={() => toggleCheck(index, nft)}
                  >
                    <div
                      className={`${Styles.userThumb} d-flex align-items-center justify-content-center`}
                    >
                      <Image className={'Dima'} src={nft.link} fluid />
                      <button
                        className={Styles.infoBtn}
                        onClick={() => setShow(index)}
                      >
                        <img src={IIcon} />{' '}
                      </button>
                      {!nft.isDisabled && toggleCheckMark(index) && (
                        <div
                          className={`${Styles.chekMark} checkmark-chosen-container`}
                        >
                          <Image src={checkmarkicon} fluid />
                        </div>
                      )}

                      <XpModal show={show === index} handleClose={handleClose}>
                        <CardWrap>
                          <div className="d-flex align-items-center">
                            <strong className="nft-details">NFT Details</strong>
                            <button
                              className={`${Styles.modalCloseButton} ml-auto close-nft-popup`}
                              onClick={handleClose}
                            >
                              <img src={X} alt="" />
                            </button>
                          </div>
                          <Row className="g-2 mt-4">
                            <Col md>
                              <Image src={nft.link} fluid />
                            </Col>

                            <Col md>
                              <form className={'mt-4 mt-md-0'}>
                                <div className={Styles.inputGroup}>
                                  <label htmlFor="NFTName">NFT Name</label>
                                  <input
                                    type="text"
                                    className={Styles.inputStyle}
                                    id={'NFTName'}
                                    value={nft.name}
                                    disabled
                                  />
                                </div>
                                <div className={Styles.inputGroup}>
                                  <label htmlFor="Description">Details</label>
                                  <div
                                    type="text"
                                    className={`${Styles.inputStyle} nft-description`}
                                    id={'Description'}
                                    value={nft.data}
                                    style={{
                                      overflow: 'hidden',
                                      minHeight: '60px',
                                      width: '100%',
                                      whiteSpace: 'break-all',
                                    }}
                                    disabled
                                  >
                                    {nft.data.split(',').map((n) => (
                                      <p>{n}</p>
                                    ))}
                                  </div>
                                </div>
                                <div className={Styles.inputGroup}>
                                  <label htmlFor="TokenID">
                                    Token ID -
                                    <CopyToClipboard
                                      text={JSON.stringify(nft.hash)}
                                      onCopy={() => setCopied(true)}
                                    >
                                      <span style={{ cursor: 'pointer' }}>
                                        {copied ? ' Copied' : ' Copy'}
                                      </span>
                                    </CopyToClipboard>
                                  </label>
                                  <input
                                    type="text"
                                    className={Styles.inputStyle}
                                    id={'TokenID'}
                                    value={JSON.stringify(nft.hash)}
                                    disabled
                                  />
                                </div>
                                <div className={Styles.inputGroup}>
                                  <label htmlFor="Blockchain">
                                    Source Blockchain
                                  </label>
                                  <div
                                    type="text"
                                    className={`${Styles.inputStyle} nft-popup-blockchain`}
                                    id={'Blockchain'}
                                    value={nft.originChain}
                                    disabled
                                  >
                                    <img
                                      src={mapChainToAvatar(nft.originChain)}
                                      alt=""
                                    />

                                    {nft.originChain === 'Ropsten'
                                      ? 'Ethereum'
                                      : nft.originChain}
                                  </div>
                                </div>
                              </form>
                            </Col>
                          </Row>
                        </CardWrap>
                      </XpModal>
                    </div>
                    <p>{nft.name}</p>
                  </div>
                )
              })
          ) : (
            <p className="your-wallet-is-empty">Your wallet is empty</p>
          )
        ) : (
          <div className="nft-loader-container">
            <Loader />
          </div>
        )}
      </div>
    </CardWrap>
  )
}

const mapStateToProps = (state) => ({
  fromAccount: state.selectReducer.fromAccount,
  toChain: state.selectReducer.toChain,
  fromChain: state.selectReducer.fromChain,
  nftList: state.selectReducer.nftList,
  loader: state.selectReducer.loader,
  nftLoader: state.selectReducer.nftLoader,
})

const mapDispatchToProps = (dispatch) => ({
  selectNFT: (hash, nonce) => dispatch(selectNFT(hash, nonce)),
  closePopup: (e) => dispatch(setModalMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NFTSourceAccount)
