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

// Actions & thunks
import { selectNFT } from '../../../actions';


const NFTSourceAccount = ({fromAccount, selectCb, nftList}) => {

  const [show, setShow] = useState(-1);
  const handleClose = () => setShow(-1);

  const [users, setUsers] = useState({
    activeMark: null,
    allUsers: nftList
  });

  const toggleCheck = (index, data) => {
    const nIndex = index === users.activeMark ? null : index;
    setUsers({ ...users, activeMark: nIndex });
    nIndex !== null ? selectCb(data) : selectCb(undefined);
  };


  const toggleCheckMark = (index) => {
    return index === users.activeMark
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
        {nftList.map((nft, index) => {     
        return (<div
            className={Styles.userItem}
            key={index}
            onClick={() => toggleCheck(index, nft)}
          >
            <div className={`${Styles.userThumb} d-flex align-items-center justify-content-center`}>
              <Image src={nft.link} fluid />
              <button className={Styles.infoBtn} onClick={() => setShow(index)}> i </button>
              {toggleCheckMark(index) && (
                <div className={Styles.chekMark}>
                  <Image src={checkmarkicon} fluid />
                </div>
              )}

              <XpModal
                show={show === index}
                handleClose={handleClose}
              >
                <CardWrap>
                  <div className="d-flex align-items-center">
                    <strong>NFT details</strong>
                    <button className={`${Styles.modalCloseButton} ml-auto`} onClick={handleClose}>X</button>
                  </div>
                  <Row className="g-2 mt-4">
                    <Col md>
                      <Image src={nft.link} fluid />
                    </Col>

                    <Col md>
                      <form className={"mt-4 mt-md-0"}>
                        <div className={Styles.inputGroup}>
                          <label htmlFor="NFTName">NFT Name</label>
                          <input
                            type="text"
                            className={Styles.inputStyle}
                            id={"NFTName"}
                            value={nft.name}
                            disabled
                          />
                        </div>
                        <div className={Styles.inputGroup}>
                          <label htmlFor="Description">Description</label>
                          <textarea
                            type="text"
                            className={Styles.inputStyle}
                            id={"Description"}
                            value={nft.data}
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
                            value={JSON.stringify(nft.hash)}
                            disabled
                          />
                        </div>
                        <div className={Styles.inputGroup}>
                          <label htmlFor="Blockchain">Blockchain</label>
                          <input
                            type="text"
                            className={Styles.inputStyle}
                            id={"Blockchain"}
                            value={nft.originChain}
                            disabled
                          />
                        </div>
                      </form>
                    </Col>
                  </Row>

                </CardWrap>
              </XpModal>

            </div>
            <p>{nft.name}</p>
          </div>
        );})}
      </div>
    </CardWrap>
  );
};

const mapStateToProps = state => ({
  fromAccount: state.selectReducer.fromAccount,
  nftList: state.selectReducer.nftList,
});

const mapDispatchToProps = dispatch => ({
  selectNFT: (hash, nonce) => dispatch(selectNFT(hash, nonce)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NFTSourceAccount);
