import React from 'react';
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

const TransferNFTSwitcher = () => {
    const switchHandler = (e) => {
        e.preventDefault();
        console.log("Switch chains cliecked");
    }

    return (
        <div className={`${Classes.switcherWrap} d-flex align-items-center justify-content-center`}>
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
                    optionName={"Alice_Stash"}
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
                    iconImage={enrollIco}
                    optionName={"Elrond"}
                    downArrow={downArrow}
                />
                <SelectItem
                    label={"Target Account"}
                    iconImage={userAvatar}
                    optionName={"Alice"}
                    downArrow={downArrow}
                />
            </CardWrap>
        </div>
    );
};

export default TransferNFTSwitcher;
