import React, {Fragment} from 'react';
import Styles from './TransferLiquidity.module.css';
import {Col, Container, Image, Row} from "react-bootstrap";
import CardWrap from "../../UIElemnts/CardWrap";
import SelectItem from "../../UIElemnts/SelectItem";
import xpNetIco from "../../assets/images/XpNet.svg";
import downArrow from "../../assets/images/downArrow.svg";
import userAvatar from "../../assets/images/userAvatar.svg";
import rightArrow from "../../assets/images/rightArrow.svg";
import leftArrow from "../../assets/images/leftArrow.svg";
import enrollIco from "../../assets/images/enroll.svg";

const TransferLiquidity = () => {
    return (
        <Container>
            <div className="title title--primary">
                <h2>Cross Chain Liquidity Bridge</h2>
            </div>
            <Row>
                <Col md={{span: 10, offset: 1}}>
                    <div className={`${Styles.switcherWrap} d-flex align-items-center justify-content-center`}>
                        <CardWrap>
                            <SelectItem
                                label={"From"}
                                iconImage={xpNetIco}
                                optionName={"XP.network"}
                                downArrow={downArrow}
                            />
                            <SelectItem
                                label={"Source Account"}
                                iconImage={userAvatar}
                                optionName={"Elrond"}
                                downArrow={downArrow}
                            />
                            <SelectItem
                                label={"Amount"}
                                iconImage={xpNetIco}
                                optionName={
                                    (<div className={Styles.amountOption}>
                                        <div className="d-flex align-items-center">
                                            <strong>XPNET</strong>
                                            <span className={`${Styles.darkAmount} ml-auto`}>$1,322,840,000.00</span>
                                        </div>
                                        <span>30,909,768,192.56087 XPNET</span>
                                        <span> @0.1333 </span>
                                    </div>)
                                }
                                downArrow={downArrow}
                            />

                            <div
                                className={`${Styles.amounInput} d-flex align-items-center`}
                                style={{marginTop: "0.6875rem"}}
                            >
                                <input
                                    type="text"
                                    className={Styles.inputStyle}
                                    value={"0.0"}
                                    disabled={true}
                                />
                            </div>
                        </CardWrap>

                        <button
                            className={`${Styles.switchModeBtn} d-flex flex-column`}
                            // onClick={switchHandler}
                        >
                            <Image src={rightArrow}/>
                            <Image src={leftArrow} className={"mt-1"}/>
                        </button>

                        <CardWrap className={"align-self-start"}>
                            <SelectItem
                                label={"To"}
                                iconImage={enrollIco}
                                optionName={"Alice_Stash"}
                                downArrow={downArrow}
                            />
                            <SelectItem
                                label={"Target Account"}
                                iconImage={userAvatar}
                                optionName={"Alice"}
                                downArrow={downArrow}
                            />

                            <div style={{marginTop: "0.6875rem"}}>
                                <div className={Styles.title}>
                                    Amount
                                </div>
                                <div className={`${Styles.amounInput} d-flex align-items-center`}>
                                    <input
                                        type="text"
                                        className={Styles.inputStyle}
                                        value={"0.0"}
                                        disabled={true}
                                    />
                                </div>
                            </div>

                            <div className={Styles.title} style={{marginTop: "0.6875rem"}}>
                                <span>Fee:</span> 0.0%
                            </div>

                        </CardWrap>
                    </div>


                    <div className="text-center mt-3 mt-md-4 mb-5">
                        <button className="btnBrand btnBrand--primary">
                            Send
                        </button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default TransferLiquidity;
