import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {Container, Row, Col} from "react-bootstrap";
import TransferNFTSwitcher from "./components/TransferNFTSwitcher";
import NFTSourceAccount from "./components/NFTSourceAccount";

import {transferNFT, showLoader, setModalMessage} from '../../actions';
import {CHAIN_INFO} from '../../cross_chain/consts';
import {sendNFTNative, sendNFTForeign, listNFTs} from '../../thunks';
import { PredefinedAccounts } from '../../cross_chain/accounts';
import SelectItem from '../../UIElemnts/SelectItem';
import XpModal from '../../UIElemnts/XpModal';
import CardWrap from "../../UIElemnts/CardWrap";

const TransferNFT = ({fromChain, fromAcct, toChain, toAcct, loader, sendNative, sendWrapped, getNfts, showLoader, modalMessage, closePopup}) => {
    const [nft, setNft] = useState(undefined);
    const [loadingInterval, setLoadingInterval] = useState()
    const [n, setN] = useState()
    useEffect(() => {
        const name = typeof fromAcct === 'string' ? fromAcct.replace(/(?:\r\n|\r|\n)/g, '') : ''
        if(PredefinedAccounts && PredefinedAccounts[fromChain] && PredefinedAccounts[fromChain][name]) {
            getNfts(fromChain, PredefinedAccounts[fromChain][name].account)
        }
    }, [fromChain, fromAcct, getNfts])

    const setLoader = () => {
        if(loadingInterval) clearInterval(loadingInterval)
        let i = 6
        const l = setInterval(() => {
            i += 0.05
            setN(i > 100 ? 100 : i)
        },100)
        setLoadingInterval(l)
    }

    useEffect(() => {
        if(!loader) {
            setN(0)
            clearInterval(loadingInterval)
        }
    },[loader])

    const handleSenNFTClick = async () => {
        console.log(nft)
        if(!loader && nft){
            showLoader(true)
            if(fromChain === 'Elrond') {
                setLoader()
            }
            if (nft.originChain === fromChain) {
                await sendNative(
                    fromChain, 
                    PredefinedAccounts[fromChain][fromAcct].key,
                    CHAIN_INFO[toChain].nonce,
                    PredefinedAccounts[toChain][toAcct].account,
                    nft.hash
                )
            } else {
                await sendWrapped(
                    fromChain,
                    PredefinedAccounts[fromChain][fromAcct].key,
                    CHAIN_INFO[toChain].nonce,
                    PredefinedAccounts[toChain][toAcct].account,
                    nft.hash
                )
            };
           
        }
        
    }
    return (
        <Container>
            <div className="title title--primary main-title">
                <h2>Cross Chain NFT Bridge</h2>
            </div>
            <Row>
                <Col md={{span: 8, offset: 2}}>
                    <TransferNFTSwitcher setNft={setNft}/>
                    <NFTSourceAccount nft={nft} selectCb={(data) => setNft(data)}/>

                    <div className="text-center mt-3 mt-md-4 mb-5">



                        <button 
                            className={`${loader ? 'interacted-button' : ''} btnBrand btnBrand--primary mainBtn`}
                            onClick={handleSenNFTClick}
                            style={{
                                backgroundColor: fromChain === 'Elrond' && loader ? '#041032' : '',
                                color: fromChain === 'Elrond' && loader ? '#FFFFFF' : '',
                                borderColor: fromChain === 'Elrond' && loader ? '#041032' : '',
                            }}
                            >
                            {fromChain === 'Elrond' && loader ? <div style={{
                                width:n + '%',
                                borderRadius: n > 80 ? '16px !important' : ''
                                }} className="loading-bar-el"></div> : ''}
                            <p className="loader-text">{loader ? "Transfering NFTs" : "Send NFTs"}</p>
                        </button>

                        {
                            fromChain === 'Elrond'
                            ? <SelectItem label={loader ? "Transfering NFTs from Elrond Testnet may take over 30 seconds" : ''}/>
                            : ''
                        }

                    </div>
                </Col>
            </Row>
            <XpModal handleClose={closePopup} show={modalMessage ? true : false} >
            <CardWrap className={"mx-md-2 my-2 successModal"}>
                <a target="_blank" href={modalMessage}>View Transaction</a>
            </CardWrap>
            </XpModal>
        </Container>
    );
};

const mapStateToProps = state => ({
    fromChain: state.selectReducer.fromChain,
    fromAcct: state.selectReducer.fromAccount,
    toChain: state.selectReducer.toChain,
    toAcct: state.selectReducer.toAccount,
    modalMessage: state.selectReducer.modalMessage,
    loader: state.selectReducer.loader,

  });
  
  const mapDispatchToProps = dispatch => ({
    transferNFT: () => dispatch(transferNFT()),
    sendNative: (chain, sender, nonce, to, id) => dispatch(sendNFTNative(chain, sender, nonce, to, id)),
    sendWrapped: (chain, sender, nonce, to, id) => dispatch(sendNFTForeign(chain, sender, nonce, to, id)),
    getNfts: (chain, owner) => dispatch(listNFTs(chain, owner)),
    showLoader: show => dispatch(showLoader(show)),
    closePopup: e => dispatch(setModalMessage())

  });

export default connect(mapStateToProps, mapDispatchToProps)(TransferNFT);