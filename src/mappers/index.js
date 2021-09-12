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
import Fantom from '../assets/images/Fantom.svg'
import Tron from '../assets/images/Tron.svg'
// Blockchain related
import { chains, coins } from '../config'

export const mapChainToAvatar = chain => {
  switch (chain) {
    case chains[0]: {
      return xpNetIco
    }
    case chains[1]: {
      return binance
    }
    case chains[2]: {
      return enrollIco
    }
    case chains[3]: {
      return Heco
    }
    case chains[4]: {
      return etherium
    }
    case chains[5]: {
      return Avalanche
    }
    case chains[6]: {
      return Polygon
    }
    case chains[7]: {
      return Fantom
    }
    case chains[8]: {
      return Tron
    }
    case chains[10]: {
      return Solana
    }
    case chains[9]: {
      return Cardano
    }
    case chains[11]: {
      return Algorand
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
