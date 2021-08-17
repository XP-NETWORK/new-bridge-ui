import React, {useState} from 'react';
import { connect } from 'react-redux';
import {Container, Row, Col, Image, Form} from "react-bootstrap";
import TransferNFTSwitcher from "./components/TransferNFTSwitcher";
import NFTSourceAccount from "./components/NFTSourceAccount";
import XpModal from "../../UIElemnts/XpModal";
import CardWrap from "../../UIElemnts/CardWrap";
import AccUser from "../../assets/images/users/accuser.png";
import Styles from "./TransferNFT.module.css";

import {transferNFT} from '../../actions';

const TransferNFT = ({transferNFT}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                            onClick={() => transferNFT()}
                            >
                            Transfer NFT
                        </button>

                        <XpModal
                            show={show}
                            handleClose={handleClose}
                        >
                            <CardWrap>
                                <div className="d-flex align-items-center">
                                    <strong>NFT details</strong>
                                    <button className={`${Styles.modalCloseButton} ml-auto`} onClick={handleClose}>X</button>
                                </div>
                                <Row className="g-2 mt-4">
                                    <Col md>
                                        <Image src={AccUser} fluid/>
                                    </Col>

                                    <Col md>
                                        <form className={"mt-4 mt-md-0"}>
                                            <div className={Styles.inputGroup}>
                                                <label htmlFor="NFTName">NFT Name</label>
                                                <input
                                                    type="text"
                                                    className={Styles.inputStyle}
                                                    id={"NFTName"}
                                                    value={"Treasur.dpsl..."}
                                                    disabled
                                                />
                                            </div>
                                            <div className={Styles.inputGroup}>
                                                <label htmlFor="Description">Description</label>
                                                <textarea
                                                    type="text"
                                                    className={Styles.inputStyle}
                                                    id={"Description"}
                                                    value={"It's red and it's a monolith!\n" +
                                                    "3223X4357, 600 dpi"}
                                                    style={{overflow: "hidden", minHeight: "60px"}}
                                                    disabled
                                                />
                                            </div>
                                            <div className={Styles.inputGroup}>
                                                <label htmlFor="TokenID">Token ID</label>
                                                <input
                                                    type="text"
                                                    className={Styles.inputStyle}
                                                    id={"TokenID"}
                                                    value={"3780914342537051"}
                                                    disabled
                                                />
                                            </div>
                                            <div className={Styles.inputGroup}>
                                                <label htmlFor="Blockchain">Blockchain</label>
                                                <input
                                                    type="text"
                                                    className={Styles.inputStyle}
                                                    id={"Blockchain"}
                                                    value={"XP.network"}
                                                    disabled
                                                />
                                            </div>
                                        </form>
                                    </Col>
                                </Row>

                            </CardWrap>
                        </XpModal>

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