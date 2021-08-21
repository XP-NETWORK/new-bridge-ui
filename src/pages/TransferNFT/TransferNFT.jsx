import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {Container, Row, Col} from "react-bootstrap";
import TransferNFTSwitcher from "./components/TransferNFTSwitcher";
import NFTSourceAccount from "./components/NFTSourceAccount";

import {transferNFT, showLoader} from '../../actions';
import {CHAIN_INFO} from '../../cross_chain/consts';
import {sendNFTNative, sendNFTForeign, listNFTs} from '../../thunks';
import { PredefinedAccounts } from '../../cross_chain/accounts';
import SelectItem from '../../UIElemnts/SelectItem';

const TransferNFT = ({fromChain, fromAcct, toChain, toAcct, loader, sendNative, sendWrapped, getNfts, showLoader}) => {
    const [nft, setNft] = useState(undefined);

    useEffect(() => {
        getNfts(fromChain, PredefinedAccounts[fromChain][fromAcct].account)
    }, [fromChain, fromAcct, getNfts])

    const handleSenNFTClick = async () => {
        
        if(!loader){
            showLoader(true)
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
            <div className="title title--primary">
                <h2>Cross Chain NFT Bridge</h2>
            </div>
            <Row>
                <Col md={{span: 8, offset: 2}}>
                    <TransferNFTSwitcher/>
                    <NFTSourceAccount selectCb={(data) => setNft(data)}/>

                    <div className="text-center mt-3 mt-md-4 mb-5">



                        <button 
                            className={`${loader ? 'interacted-button' : ''} btnBrand btnBrand--primary`}
                            onClick={handleSenNFTClick}
                            >
                            {loader ? "Transfering NFTs" : "Send NFTs"}
                        </button>

                        {
                            fromChain === 'Elrond'
                            ? <SelectItem label={loader ? "Transfering NFTs from Elrond Testnet may take over 30 seconds" : ''}/>
                            : ''
                        }

                    </div>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = state => ({
    fromChain: state.selectReducer.fromChain,
    fromAcct: state.selectReducer.fromAccount,
    toChain: state.selectReducer.toChain,
    toAcct: state.selectReducer.toAccount,
    loader: state.selectReducer.loader,

  });
  
  const mapDispatchToProps = dispatch => ({
    transferNFT: () => dispatch(transferNFT()),
    sendNative: (chain, sender, nonce, to, id) => dispatch(sendNFTNative(chain, sender, nonce, to, id)),
    sendWrapped: (chain, sender, nonce, to, id) => dispatch(sendNFTForeign(chain, sender, nonce, to, id)),
    getNfts: (chain, owner) => dispatch(listNFTs(chain, owner)),
    showLoader: show => dispatch(showLoader(show)),

  });

export default connect(mapStateToProps, mapDispatchToProps)(TransferNFT);