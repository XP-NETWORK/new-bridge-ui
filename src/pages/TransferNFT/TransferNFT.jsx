import React from 'react';
import { connect } from 'react-redux';
import {Container, Row, Col} from "react-bootstrap";
import TransferNFTSwitcher from "./components/TransferNFTSwitcher";
import NFTSourceAccount from "./components/NFTSourceAccount";

import {transferNFT} from '../../actions';

const TransferNFT = ({transferNFT}) => {

    return (
        <Container>
            <div className="title title--primary">
                <h2>Cross Chain NFT Bridge</h2>
            </div>
            <Row>
                <Col md={{span: 8, offset: 2}}>
                    <TransferNFTSwitcher
                        
                    />
                    <NFTSourceAccount
                    
                    />

                    <div className="text-center mt-3 mt-md-4 mb-5">
                        <button 
                            className="btnBrand btnBrand--primary"
                            onClick={() => transferNFT()}
                            >
                            Transfer NFT
                        </button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = state => ({
    //...
  });
  
  const mapDispatchToProps = dispatch => ({
    transferNFT: () => dispatch(transferNFT())
  });

export default connect(mapStateToProps, mapDispatchToProps)(TransferNFT);