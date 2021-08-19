import React from 'react';
import { connect } from 'react-redux';
import {Image} from "react-bootstrap";
import xpNetIco from '../../../assets/images/XpNet.svg';
import enrollIco from '../../../assets/images/enroll.svg';
import userAvatar from '../../../assets/images/userAvatar.svg';
import downArrow from '../../../assets/images/downArrow.svg';
import leftArrow from '../../../assets/images/leftArrow.svg';
import rightArrow from '../../../assets/images/rightArrow.svg';
import CardWrap from "../../../UIElemnts/CardWrap";
import SelectItem from "../../../UIElemnts/SelectItem";
import Classes from './TransferNFTSwitcher.module.css';
import {swapChains} from '../../../actions'
import {mapChainToAvatar, mapCoinToAvatar} from '../../../mappers';


const TransferNFTSwitcher = ({fromChain, toChain, fromAccount, toAccount, onSwapChainsPressed}) => {

    const switchHandler = (e) => {
        e.preventDefault();
        onSwapChainsPressed();
    }

    return (
        <div className={`${Classes.switcherWrap} d-flex align-items-center justify-content-center`}>
            <CardWrap>
                <SelectItem
                    label={"From"}
                    iconImage={mapChainToAvatar(fromChain)}
                    optionName={fromChain}
                    downArrow={downArrow}
                />
                <SelectItem
                    label={"Source Account"}
                    iconImage={userAvatar}
                    optionName={fromAccount}
                    downArrow={downArrow}
                />
            </CardWrap>

            <button
                className={`${Classes.switchModeBtn} d-flex flex-column`}
                onClick={switchHandler}
            >
                <Image src={rightArrow}/>
                <Image src={leftArrow} className={"mt-1"}/>
            </button>

            <CardWrap>
                <SelectItem
                    label={"To"}
                    iconImage={mapChainToAvatar(toChain)}
                    optionName={toChain}
                    downArrow={downArrow}
                />
                <SelectItem
                    label={"Target Account"}
                    iconImage={userAvatar}
                    optionName={toAccount}
                    downArrow={downArrow}
                />
            </CardWrap>
        </div>
    );
};

const mapStateToProps = state => ({
        fromChain: state.selectReducer.fromChain,
        toChain: state.selectReducer.toChain,
        fromAccount: state.selectReducer.fromAccount,
        toAccount: state.selectReducer.toAccount
});

const mapDispatchToProps = dispatch => ({
    onSwapChainsPressed: () => dispatch(swapChains())
});

export default connect(mapStateToProps, mapDispatchToProps)(TransferNFTSwitcher);
