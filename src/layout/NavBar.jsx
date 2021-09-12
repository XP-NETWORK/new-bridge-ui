import React, { useState } from 'react'
import { Navbar, Container, Nav, Image } from 'react-bootstrap'
import Logo from '../assets/images/mainLogo.svg'
import GreenDot from '../assets/images/greenDot.svg'
import GreenDots from '../assets/images/emptywal.svg'
import Drop from '../assets/images/dropdown.svg'
import Close from '../assets/images/closepopup.svg'
import { Link, NavLink } from 'react-router-dom'
import Classes from './NavBar.module.css'
import { Dropdown } from 'semantic-ui-react'
import XpModal from '../UIElemnts/XpModal'

import Choose from '../assets/images/wallet/choose.svg'
import XPWallet from '../assets/images/wallet/xpwallet.svg'
import WalletConnect from '../assets/images/wallet/walletconnect.svg'
import Trezor from '../assets/images/wallet/trezor.svg'
import MetaMask from '../assets/images/wallet/metamask.svg'
import Ledger from '../assets/images/wallet/ledger.svg'

const NavBar = () => {
  const [open, setOpen] = useState()
  const toggle = () => setOpen(!open)
  const transferTokens = 'Tokens Transfer - Coming Soon'
  const ledger = 'Ledger - Coming Soon'

  const wallets = [
    { text: 'Demo XP.network wallet', image: XPWallet },
    { text: 'Ledger', image: Ledger, disabled: true },
    { text: 'MetaMask', image: MetaMask, disabled: true },
    { text: 'Trezor', image: Trezor, disabled: true },
    { text: 'WalletConnect', image: WalletConnect, disabled: true },
  ]

  return (
    <Navbar
      expand="lg"
      className={`${Classes.navbarBorder} navbar-container-main`}
    >
      <Container className="navbar-containerr">
        <a href="https://xp.network" target="_blank" className={'navbar-brand'}>
          <Image src={Logo} fluid />
        </a>
        <Nav className={`${Classes.linkTab} mb-2 mobile-show`}>
          {/* <Link to="#home">Link 2</Link> */}
          <span className="cross_ch">
            Cross-Chain Bridge Demo {/*<span className="betaa">Beta</span>*/}
          </span>
        </Nav>
        <Nav className={`${Classes.tabNav} d-md-block ml-auto mobile-ledger`}>
          <Link onClick={toggle} className="navbarmobilewallet" to="#link">
            <div className="innerdropnav">
              <div className="assadkladslkads">
                <img src={XPWallet} />
                Demo XP.network wallet
              </div>
              <img className="dropdnav" src={Drop} />
            </div>
          </Link>
        </Nav>
        {/*  */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={Classes.basicNav}>
          <Nav
            className={`${Classes.tabNav} d-none d-md-block center-of-navbar`}
          >
            <NavLink exact={true} to="/" activeClassName={Classes.selected}>
              Transfer NFTs
            </NavLink>
            <NavLink
              to="/transfer-tokens"
              className="tokens-tranfer-s"
              activeClassName={`${Classes.selected}`}
            >
              Tokens Transfer <span className="coming-soon-i">Coming soon</span>
            </NavLink>
          </Nav>

          <Nav className={`${Classes.linkTab} d-none d-md-block`}>
            {/* <Link to="#home">Link 2</Link> */}
            <span className="cross_ch">
              Cross-Chain Bridge Demo {/*<span className="betaa">Beta</span>*/}
            </span>
          </Nav>

          <Nav
            onClick={toggle}
            className={`${Classes.tabNav} d-none d-md-block ml-auto dropdownnav`}
          >
            <div className="innerdropnav">
              <div className="assadkladslkads">
                <img src={XPWallet} />
                Demo XP.network wallet
              </div>
              <img className="dropdnav" src={Drop} />
            </div>
          </Nav>

          <Nav className={`${Classes.tabNavResponsive} d-md-none`}>
            <Nav className={`${Classes.linkTab} mb-2`}>
              {/* <Link to="#home">Link 2</Link> */}
              <span className="cross_ch">
                Cross-Chain Bridge Demo{' '}
                {/*<span className="betaa">Beta</span>*/}
              </span>
            </Nav>

            <Link to="#link">
              <Image src={GreenDot} fluid /> Ledger -{' '}
              <span className="coming-soon-i">Coming soon</span>
            </Link>
          </Nav>
        </Navbar.Collapse>

        <Nav
          className={`${Classes.tabNav} ${Classes.resTabNav} d-lg-none mt-3 mobile-tab`}
        >
          <NavLink exact={true} to="/" activeClassName={Classes.selected}>
            Transfer NFT
          </NavLink>
          <NavLink to="/transfer-tokens" activeClassName={Classes.selected}>
            Transfer Tokens
          </NavLink>
        </Nav>
      </Container>
      <XpModal className="nav-bar-modal" show={open} handleClose={toggle}>
        <div className="navbar-modal">
          <div className="navbar-modal-header">
            <h2>
              <img src={Choose} />
              Choose a Wallet
            </h2>
            <img onClick={toggle} className="closemodal" src={Close} />
          </div>

          <p className="select-wallet-desc">
            Please select a wallet to connect to the bridge:
          </p>
          {wallets.map((n, i) => (
            <div
              onClick={() => (n.disabled ? '' : toggle())}
              className={`wallet-navbar ${n.disabled ? 'disabled-wallet' : ''}`}
              key={i}
            >
              <img src={n.image} /> <p>{n.text}</p>{' '}
              {n.disabled ? (
                <span className="coming-soon-wallet">Coming soon</span>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
      </XpModal>
    </Navbar>
  )
}

export default NavBar
