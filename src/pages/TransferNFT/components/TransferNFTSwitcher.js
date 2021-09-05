// External Imports
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { Image } from "react-bootstrap";
// SVG Icons
import userAvatar from '../../../assets/images/userAvatar.svg';
import {ReactComponent as RightArrow} from "../../../assets/images/rightArrow.svg";
import {ReactComponent as LeftArrow} from "../../../assets/images/leftArrow.svg";
// User components
import CardWrap from "../../../UIElemnts/CardWrap";
import SelectItem from "../../../UIElemnts/SelectItem";
import Classes from './TransferNFTSwitcher.module.css';

// Blockchain Related
import { 
    selectFromChain,
    selectToChain,
    selectFromAccount,
    selectToAccount,
    swapChains,
    setModalMessage,

} from '../../../actions'
import { mapChainToAvatar} from '../../../mappers';
import { chains } from '../../../config';


const TransferNFTSwitcher = ({ 
    fromChain, 
    toChain, 
    fromAccount, 
    setNft,
    toAccount, 
    fromAccountS, 
    toAccountS, 
    onSwapChainsPressed,
    loader,
    closePopup,
    selectFromChain,
    selectToChain,
    selectFromAccount,
    selectToAccount,

}) => {

    const tranBridge = chains.map(item => {
        const dis = item == chains[5] || item == chains[6] || item == chains[7] ||item == chains[8]
        return {
            key: item,
            text: dis ? item + ' - Coming soon' : item === 'Ropsten' ? 'Ethereum' : item,
            value: item,
            disabled: dis,
            image: { avatar: true, src: mapChainToAvatar(item) }
        }
    });
    const toBridge = chains.map(item => {
        const dis = item == chains[5] || item == chains[6] || item == chains[7] ||item == chains[8]
        return {
            key: item,
            text: dis ? item + ' - Coming soon' : item === 'Ropsten' ? 'Ethereum' : item,
            value: item,
            disabled: item === fromChain || dis,
            image: { avatar: true, src: mapChainToAvatar(item) }
        }
    });
    const sourceAccounts = fromAccountS.map(item => {
        return {
            key: item,
            text: item,
            value: item,
            disabled: item === fromChain,
            image: { avatar: true, src: userAvatar }
        }
    });

    const targetAccounts = toAccountS.map(item => {
        return {
            key: item,
            text: item,
            value: item,
            image: { avatar: true, src: userAvatar }
        }
    })

    const switchHandler = (e) => {
        console.log(e)
            e.preventDefault();
            if(!loader) { {
                closePopup()
                setNft(undefined)
            }
            onSwapChainsPressed();
        }

    }

    const getVal = e => {
       const v =  e.target.innerText.replace(/(?:\r\n|\r|\n)/g, '')
       if(v === 'Ethereum') return 'Ropsten'
       else return v
    }

    const handleChangeFrom = (e) => {
        closePopup()
        e.preventDefault();
        if(toChain === getVal(e)){
            selectToChain(fromChain);
            selectFromChain(getVal(e));
        } else  selectFromChain(getVal(e));
    }

    const handleChangeTo = (e) => {
        closePopup()
        e.preventDefault();
        if(fromChain === getVal(e)) {
            selectFromChain(toChain);
            selectToChain(getVal(e));
        } else selectToChain(getVal(e));
    }

    const handleChangeFromAcct = (e) => {
        closePopup()
        e.preventDefault();
        selectFromAccount(getVal(e))
    }

    const handleChangeToAcct = (e) => {
        closePopup()
        e.preventDefault();
        setNft(undefined)
        selectToAccount(getVal(e))
    }

    const addIdToSelect = e => {
        setTimeout(() => {
            const c = Array.prototype.slice.call(document.getElementsByClassName('visible menu'),0)
           c.forEach(n => {
               n.setAttribute('id', 'id-of-selctor')
           })
        },1)

    }

    return (
        <Fragment>
            <div className={`${Classes.switcherWrap} d-flex align-items-center justify-content-center`}>
                <CardWrap>
                    <SelectItem label={"From"}>
                        <Dropdown
                            placeholder='Select option'
                            fluid
                            selection
                            options={tranBridge}
                            onChange={e => handleChangeFrom(e)}
                            value={fromChain}
                            onOpen={addIdToSelect}
                            disabled={loader}
                        />
                    </SelectItem>

                    <SelectItem className="second-title" label={"Source Account"}>
                    <Dropdown
                            placeholder='Select option'
                            fluid
                            selection
                            options={sourceAccounts}
                            onChange={e=>handleChangeFromAcct(e)}
                            value={fromAccount}
                            onOpen={addIdToSelect}
                            disabled={loader}
                        />
                    </SelectItem>
                </CardWrap>

                <button
                    className={`${Classes.switchModeBtn} d-flex flex-column asdadddssaads ${loader ? 'disabled-arrows' : ''}`}
                    onClick={switchHandler}
                >
                            <RightArrow />
                            <LeftArrow className="mt-1" />
                </button>

                <CardWrap>
                    <SelectItem label={"To"}>
                        <Dropdown
                            placeholder='Select option'
                            fluid
                            selection
                            id="lalala"
                            options={toBridge}
                            disabled={loader}
                            onOpen={addIdToSelect}
                            onChange={e=>handleChangeTo(e)}
                            value={toChain}
                        />
                    </SelectItem>
                    <SelectItem className="second-title" label={"Target Account"}>
                    <Dropdown
                            placeholder='Select option'
                            fluid
                            selection
                            style={{
                                
                            }}
                            options={targetAccounts}
                            disabled={loader}
                            onOpen={addIdToSelect}
                            onChange={e=>handleChangeToAcct(e)}
                            value={toAccount}
                        />
                    </SelectItem>
                </CardWrap>
            </div>
        </Fragment>

    );
};

const mapStateToProps = state => ({

    fromChain: state.selectReducer.fromChain,
    toChain: state.selectReducer.toChain,
    loader: state.selectReducer.loader,

    fromAccount: state.selectReducer.fromAccount,
    toAccount: state.selectReducer.toAccount,

    fromAccountS: state.selectReducer.fromAccountS,
    toAccountS: state.selectReducer.toAccountS,

});

const mapDispatchToProps = dispatch => ({
    onSwapChainsPressed: () => dispatch(swapChains()),

    selectFromChain: value => dispatch(selectFromChain(value)),
    selectToChain: value => dispatch(selectToChain(value)),
    selectFromAccount: value => dispatch(selectFromAccount(value)),
    selectToAccount: value => dispatch(selectToAccount(value)),
    closePopup: e => dispatch(setModalMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(TransferNFTSwitcher);
