// External Imports
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Image, Form } from "react-bootstrap";
// Internal Imports
import Styles from './NFTSourceAccount.module.css';
// Custom Components
import CardWrap from "../../../UIElemnts/CardWrap";
import XpModal from "../../../UIElemnts/XpModal";
// 
import userAvatar from '../../../assets/images/userAvatar.svg';
import AccUser from "../../../assets/images/users/accuser.png";
import checkmarkicon from "../../../assets/images/checkmark.svg";
// Fake NFTs
import user1 from '../../../assets/images/users/u1.svg';
import user2 from '../../../assets/images/users/u2.svg';
import user3 from '../../../assets/images/users/u3.svg';
import user4 from '../../../assets/images/users/u4.svg';
import user5 from '../../../assets/images/users/u5.svg';

// Actions & thunks
import { selectNFT } from '../../../actions';
import {listNFTs} from '../../../thunks';
import { PredefinedAccounts } from '../../../cross_chain/accounts';


const NFTSourceAccount = ({fromChain, fromAccount, selectNFT, getNfts}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadNfts = getNfts(fromChain, PredefinedAccounts[fromChain][fromAccount].account);
  

  const NFT = [
    {
      userAvatar: user1,
      userText: "Treasure one",
      hash: "78870687087f087a087",
      nonce: 1
    },
    {
      userAvatar: user2,
      userText: "Day on kdjhf",
      hash: "045a204b203c4203f",
      nonce: 2
    },
    {
      userAvatar: user3,
      userText: "Treasuor.dpsl",
      hash: "3246709735139847",
      nonce: 3
    },
    {
      userAvatar: user4,
      userText: "Day one9999",
      hash: "78987098070987098790",
      nonce: 4
    },
    {
      userAvatar: user5,
      userText: "Treasurkdhni",
      hash: "345354654365436543654",
      nonce: 5
    },
  ]

  const [users, setUsers] = useState({
    activeMark: null,
    allUsers: NFT
  });

  const toggleCheck = (index, hash, nonce) => {
    setUsers({ ...users, activeMark: users.allUsers[index] });
    selectNFT(hash, nonce)
  };


  const toggleCheckMark = (index) => {
    if (users.allUsers[index] === users.activeMark) {
      return users.activeMark = true;
    }
  }



  return (
    <CardWrap className={"mx-md-4 my-4"}>
      <div className={`${Styles.srcAcc} d-flex align-items-center`}>
        <span>NFTs on </span>
        <div className={`${Styles.user} d-flex align-items-center ml-2`}>
          <Image src={userAvatar} />
          <span className="name ml-2">{fromAccount}</span>
        </div>
      </div>

      <div className="d-flex align-items-center flex-wrap">
        {NFT.map((nft, index) => (
          <div
            className={Styles.userItem}
            key={index}
            onClick={() => toggleCheck(index, nft.hash, nft.nonce)}
          >
            <div className={`${Styles.userThumb} d-flex align-items-center justify-content-center`}>
              <Image src={nft.userAvatar} fluid />
              <button className={Styles.infoBtn} onClick={handleShow}> i </button>
              {toggleCheckMark(index) && (
                <div className={Styles.chekMark}>
                  <Image src={checkmarkicon} fluid />
                </div>
              )}

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
                      <Image src={AccUser} fluid />
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
                            style={{ overflow: "hidden", minHeight: "60px" }}
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
            <p>{nft.userText}</p>
          </div>
        ))}
      </div>
    </CardWrap>
  );
};

const mapStateToProps = state => ({
  fromChain: state.selectReducer.fromChain,
  fromAccount: state.selectReducer.fromAccount,
});

const mapDispatchToProps = dispatch => ({
  selectNFT: (hash, nonce) => dispatch(selectNFT(hash, nonce)),
  getNfts: (chain, owner) => dispatch(listNFTs(chain, owner)),

});

export default connect(mapStateToProps, mapDispatchToProps)(NFTSourceAccount);
