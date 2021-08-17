import React from 'react';
import { connect } from 'react-redux';
import Styles from './NFTSourceAccount.module.css';
import CardWrap from "../../../UIElemnts/CardWrap";
import {Image} from "react-bootstrap";
import userAvatar from '../../../assets/images/userAvatar.svg';
import user1 from '../../../assets/images/users/u1.svg';
import user2 from '../../../assets/images/users/u2.svg';
import user3 from '../../../assets/images/users/u3.svg';
import user4 from '../../../assets/images/users/u4.svg';
import user5 from '../../../assets/images/users/u5.svg';

import {selectNFT} from '../../../actions';

const NFTSourceAccount = ({fromAccount, selectNFT}) => {
    const NFT = [
        {
          userAvatar: user1,
          userText: "Treasure one",
          hash:"78870687087f087a087",
          nonce:1
        },
        {
          userAvatar: user2,
          userText: "Day on kdjhf",
          hash:"045a204b203c4203f",
          nonce:2
        },
        {
          userAvatar: user3,
          userText: "Treasuor.dpsl",
          hash:"3246709735139847",
          nonce:3
        },
        {
          userAvatar: user4,
          userText: "Day one9999",
          hash:"78987098070987098790",
          nonce:4
        },
        {
          userAvatar: user5,
          userText: "Treasurkdhni",
          hash:"345354654365436543654",
          nonce:5
        },
    ]



    return (
        <CardWrap className={"mx-md-4 my-4"}>
            <div className={`${Styles.srcAcc} d-flex align-items-center`}>
                <span>NFTs on </span>
                <div className={`${Styles.user} d-flex align-items-center ml-2`}>
                    <Image src={userAvatar}/>
                    <span className="name ml-2">{fromAccount}</span>
                </div>
            </div>

            <div className="d-flex align-items-center flex-wrap">
                {NFT.map((nft, index)=>(
                    <div 
                      className={Styles.userItem} 
                      key={index}
                      onClick={() => selectNFT(nft.hash, nft.nonce)}
                      >
                        <div className={`${Styles.userThumb} d-flex align-items-center justify-content-center`}>
                            <Image src={nft.userAvatar} fluid/>
                            <button className={Styles.infoBtn}> i </button>
                        </div>
                        <p>{nft.userText}</p>
                    </div>
                ))}
            </div>
        </CardWrap>
    );
};

const mapStateToProps = state => ({
  fromAccount: state.selectReducer.fromAccount,
});

const mapDispatchToProps = dispatch => ({
  selectNFT: (hash, nonce) => dispatch(selectNFT(hash, nonce))
});

export default connect(mapStateToProps, mapDispatchToProps)(NFTSourceAccount);
