import React from 'react';
import { connect } from 'react-redux';
import Styles from './TransferLiquidity.module.css';
import { Col, Container, Image, Row } from "react-bootstrap";
import CardWrap from "../../UIElemnts/CardWrap";
import SelectItem from "../../UIElemnts/SelectItem";
import xpNetIco from "../../assets/images/XpNet.svg";
import downArrow from "../../assets/images/downArrow.svg";
import userAvatar from "../../assets/images/userAvatar.svg";
import rightArrow from "../../assets/images/rightArrow.svg";
import leftArrow from "../../assets/images/leftArrow.svg";
import enrollIco from "../../assets/images/enroll.svg";
import { swapChains, changeAmount, transferCoins } from '../../actions';
import { chains, coins, exchangeRates } from '../../config';
import { PredefinedAccounts } from '../../cross_chain/accounts';
import {
    getBalanceThunk,
    sendTokens,
    returnWrappedTokens,

} from '../../thunks';
import {CHAIN_INFO} from '../../cross_chain/consts';

const TransferLiquidity = ({

    // States
    fromChain,
    toChain,
    fromAccount,
    toAccount,
    amount,
    balance,
    coin,
    exchangeRate,

    // Dispatch emitters:
    getbalance,
    onSwapChainsPressed,
    onChaneAmount,
    send,
    sendWrapped
}) => {

    getbalance(fromChain, fromAccount);
    // getbalance("Ropsten", 'ACC1')


    const switchHandler = (e) => {
        e.preventDefault();
        onSwapChainsPressed();
    }

    const handleChangeAmount = (e) => {
        e.preventDefault();
        onChaneAmount(e.target.value);
    }

    const sendAnyToken = () => {

        console.log('Send any token');

        let func = undefined;

        if(coin === coins[chains.indexOf(fromChain)]){
            func = send;
        }else{
            func = sendWrapped;
        }
        
        func(
            fromChain,
            PredefinedAccounts[fromChain][fromAccount].account,
            CHAIN_INFO[fromChain],
            PredefinedAccounts[toChain][toAccount].account,
            amount
        )
    }

    return (
        <Container>
            <div className="title title--primary">
                <h2>Cross Chain Liquidity Bridge</h2>
            </div>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <div className={`${Styles.switcherWrap} d-flex align-items-center justify-content-center`}>
                        <CardWrap>
                            <SelectItem
                                label={"From"}
                                iconImage={xpNetIco}
                                optionName={fromChain}
                                downArrow={downArrow}
                            />
                            <SelectItem
                                label={"Source Account"}
                                iconImage={userAvatar}
                                optionName={fromAccount}
                                downArrow={downArrow}
                            />
                            <SelectItem
                                label={"Amount"}
                                iconImage={xpNetIco}
                                optionName={
                                    (<div className={Styles.amountOption}>
                                        <div className="d-flex align-items-center">
                                            <strong>{coin}</strong>
                                            <span className={`${Styles.darkAmount} ml-auto`}>${balance * exchangeRate}</span>
                                        </div>
                                        <span>{balance} {coin}</span>
                                        <span> @{exchangeRate} </span>
                                    </div>)
                                }
                                downArrow={downArrow}
                            />

                            <div
                                className={`${Styles.amounInput} d-flex align-items-center`}
                                style={{ marginTop: "0.6875rem" }}
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
                        >
                            <Image src={rightArrow} />
                            <Image src={leftArrow} className={"mt-1"} />
                        </button>

                        <CardWrap className={"align-self-start"}>
                            <SelectItem
                                label={"To"}
                                iconImage={enrollIco}
                                optionName={toChain}
                                downArrow={downArrow}
                            />
                            <SelectItem
                                label={"Target Account"}
                                iconImage={userAvatar}
                                optionName={toAccount}
                                downArrow={downArrow}
                            />

                            <div style={{ marginTop: "0.6875rem" }}>
                                <div className={Styles.title}>
                                    Amount
                                </div>
                                <div className={`${Styles.amounInput} d-flex align-items-center`}>
                                    <input
                                        type="number"
                                        className={Styles.inputStyle}
                                        value={amount}
                                        placeholder={'0.0'}
                                        disabled={true}
                                    />
                                </div>
                            </div>

                            <div className={Styles.title} style={{ marginTop: "0.6875rem" }}>
                                <span>Fee:</span> 0.0%
                            </div>

                        </CardWrap>
                    </div>


                    <div className="text-center mt-3 mt-md-4 mb-5">
                        <button
                            className="btnBrand btnBrand--primary"
                            onClick={sendAnyToken}
                        >
                            Send
                        </button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = state => ({
    fromChain: state.selectReducer.fromChain,
    toChain: state.selectReducer.toChain,
    fromAccount: state.selectReducer.fromAccount,
    toAccount: state.selectReducer.toAccount,
    amount: state.selectReducer.amount,
    balance: state.selectReducer.acctBalanceCoins,
    coin: state.selectReducer.coin,
    exchangeRate: state.selectReducer.exchangeRate,

});

const mapDispatchToProps = dispatch => ({
    onSwapChainsPressed: () => dispatch(swapChains()),
    onChaneAmount: value => dispatch(changeAmount(value)),
    send: (chain, signer, nonce, to, value) => dispatch(sendTokens(chain, signer, nonce, to, value)),
    sendWrapped: (chain, signer, nonce, to, value) => dispatch(returnWrappedTokens(chain, signer, nonce, to, value)),
    getbalance: (chain, account) => dispatch(getBalanceThunk(chain, account)),

});

export default connect(mapStateToProps, mapDispatchToProps)(TransferLiquidity);
