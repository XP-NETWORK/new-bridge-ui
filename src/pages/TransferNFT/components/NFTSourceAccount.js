import React from 'react';
import Styles from './NFTSourceAccount.module.css';
import CardWrap from "../../../UIElemnts/CardWrap";
import {Image} from "react-bootstrap";
import userAvatar from '../../../assets/images/userAvatar.svg';
import user1 from '../../../assets/images/users/u1.svg';
import user2 from '../../../assets/images/users/u2.svg';
import user3 from '../../../assets/images/users/u3.svg';
import user4 from '../../../assets/images/users/u4.svg';
import user5 from '../../../assets/images/users/u5.svg';

const NFTSourceAccount = () => {
    const users = [
        {
          userAvatar: user1,
          userText: "Treasure one"
        },
        {
          userAvatar: user2,
          userText: "Day on kdjhf"
        },
        {
          userAvatar: user3,
          userText: "Treasuor.dpsl"
        },
        {
          userAvatar: user4,
          userText: "Day one9999"
        },
        {
          userAvatar: user5,
          userText: "Treasurkdhni"
        },
    ]



    return (
        <CardWrap className={"mx-md-4 my-4"}>
            <div className={`${Styles.srcAcc} d-flex align-items-center`}>
                <span>NFTs on </span>
                <div className={`${Styles.user} d-flex align-items-center ml-2`}>
                    <Image src={userAvatar}/>
                    <span className="name ml-2">Alice_Stash</span>
                </div>
            </div>

            <div className="d-flex align-items-center flex-wrap">
                {users.map((user, index)=>(
                    <div className={Styles.userItem} key={index}>
                        <div className={`${Styles.userThumb} d-flex align-items-center justify-content-center`}>
                            <Image src={user.userAvatar} fluid/>
                            <button className={Styles.infoBtn}> i </button>
                        </div>
                        <p>{user.userText}</p>
                    </div>
                ))}
            </div>
        </CardWrap>
    );
};

export default NFTSourceAccount;
