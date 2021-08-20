import React from 'react';
import { connect } from 'react-redux';
import {Container, Row, Col} from "react-bootstrap";
import TransferNFTSwitcher from "./components/TransferNFTSwitcher";
import NFTSourceAccount from "./components/NFTSourceAccount";

import {transferNFT} from '../../actions';
import {CHAIN_INFO} from '../../cross_chain/consts';
import {sendNFTNative, sendNFTForeign} from '../../thunks';
import { PredefinedAccounts } from '../../cross_chain/accounts';
import SelectItem from '../../UIElemnts/SelectItem';

const TransferNFT = ({fromChain, fromAcct, toChain, toAcct, sendNative, id, sendWrapped}) => {

    const handleSenNFTClick = () => {

        // If native - sendNative
        sendNative(
            fromChain, 
            PredefinedAccounts[fromChain][fromAcct].key,
            CHAIN_INFO[toChain].nonce,
            PredefinedAccounts[toChain][toAcct].account,
            id
            )
        // Else - sendWrapped

    }

    return (
        <Container>
            <div className="title title--primary">
                <h2>Cross Chain NFT Bridge</h2>
            </div>
            <Row>
                <Col md={{span: 8, offset: 2}}>
                    <TransferNFTSwitcher/>
                    <NFTSourceAccount/>

                    <div className="text-center mt-3 mt-md-4 mb-5">
                        <button 
                            className="btnBrand btnBrand--primary"
                            onClick={handleSenNFTClick}
                            >
                            Transfer NFT
                        </button>

                        {
                            fromChain === 'Elrond'
                            ? <SelectItem label={"Transfering NFTs from Elrond Testnet may take over 30 seconds"}/>
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
    fromAcct: state.selectReducer.fromAcct,
    toChain: state.selectReducer.toChain,
    toAcct: state.selectReducer.toAcct,
    id: state.selectReducer.selNFTHash,

  });
  
  const mapDispatchToProps = dispatch => ({
    transferNFT: () => dispatch(transferNFT()),
    sendNative: (chain, sender, nonce, to, id) => dispatch(sendNFTNative(chain, sender, nonce, to, id)),
    sendWrapped: (chain, sender, to, id) => dispatch(sendNFTForeign(chain, sender, to, id))
  });

export default connect(mapStateToProps, mapDispatchToProps)(TransferNFT);