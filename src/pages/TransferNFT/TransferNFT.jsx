import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import TransferNFTSwitcher from "./components/TransferNFTSwitcher";
import NFTSourceAccount from "./components/NFTSourceAccount";

const TransferNFT = () => {


    const handleClick = () => {
        console.log('Transfer NFT clicked');
    }

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
                            onClick={handleClick}
                            >
                            Transfer NFT
                        </button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default TransferNFT;