// Blockchain Avatars
import xpNetIco from '../assets/images/XpNet.svg'
import enrollIco from '../assets/images/enroll.svg'
import binance from '../assets/images/binance.svg'
import etherium from '../assets/images/Etherium.svg'
import Heco from '../assets/images/HECO.svg'
import Cardano from '../assets/images/cardano.svg'
import Polygon from '../assets/images/polygon.svg'
import Solana from '../assets/images/Solana.svg'
import Avalanche from '../assets/images/avalanche.svg'
import Algorand from '../assets/images/Algarand.svg'
import Fantom from '../assets/images/Fantom 1.svg'
import Tron from "../assets/images/tron 1.svg"
import Diem from "../assets/images/diem.svg"
// Blockchain related
import { chains, coins } from '../config'

export const mapChainToAvatar = chain => {
  switch (chain) {
    
    case chains[0]: {
      return binance
    }
    case chains[1]: {
      return enrollIco
    }
    case chains[2]: {
      return Heco
    }
    case chains[3]: {
      return etherium
    }
    case chains[4]: {
      return Avalanche
    }
    case chains[5]: {
      return Polygon
    }
    case chains[6]: {
      return Fantom
    }
	case chains[7]: {
	  return Tron  
	}
    case chains[8]: {
      return Cardano
    }
    case chains[9]: {
      return Solana
    }
    case chains[10]: {
      return Algorand
    }
	case chains[11]: {
	  return Diem
	}
  case chains[12]: {
    return xpNetIco
  }
    default: {
      return xpNetIco
    }
  }
}

export const mapCoinToAvatar = coin => {
  switch (coin) {
    case coins[0]: {
      return xpNetIco
    }
    case coins[1]: {
      return binance
    }
    case coins[2]: {
      return enrollIco
    }
    case coins[3]: {
      return Heco
    }
    case coins[4]: {
      return etherium
    }
    default: {
      return xpNetIco
    }
  }
}
