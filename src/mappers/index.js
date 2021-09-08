// Blockchain Avatars
import xpNetIco from '../assets/images/XpNet.svg';
import enrollIco from '../assets/images/enroll.svg';
import binance from '../assets/images/binance.svg';
import etherium from '../assets/images/Etherium.svg';
import heco from '../assets/images/HECO.svg';
import heco1 from '../assets/images/cardano.svg';
import heco2 from '../assets/images/Solana.svg';
import heco3 from '../assets/images/avalanche.svg';
import heco4 from '../assets/images/Algarand.svg';
// Blockchain related
import {chains, coins} from '../config';

export const mapChainToAvatar = (chain) => {
    switch(chain){
      case chains[0]:{
        return xpNetIco;
      }
      case chains[1]:{
        return binance;
      }
      case chains[2]:{
        return enrollIco;
      }
      case chains[3]:{
        return heco;
      }
      case chains[4]:{
        return etherium;
      }
      case chains[5]:{
        return heco3;
      }
      case chains[8]:{
        return heco2;
      }
      case chains[7]:{
        return heco1;
      }
      case chains[9]:{
        return heco4;
      }
      default:{
        return xpNetIco;
      }
    }
  }
  
  export const mapCoinToAvatar = (coin) => {
    switch(coin){
      case coins[0]:{
        return xpNetIco;
      }
      case coins[1]:{
        return binance;
      }
      case coins[2]:{
        return enrollIco;
      }
      case coins[3]:{
        return heco;
      }
      case coins[4]:{
        return etherium;
      }
      default:{
        return xpNetIco;
      }
    }
  }