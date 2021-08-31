import React from 'react';
import {Navbar, Container, Nav, Image} from 'react-bootstrap';
import Logo from '../assets/images/mainLogo.svg';
import GreenDot from '../assets/images/greenDot.svg';
import GreenDots from '../assets/images/Ellipse168q.svg';
import {Link, NavLink} from "react-router-dom";
import Classes from './NavBar.module.css';

const NavBar = () => {

    const transferTokens = "Tokens Transfer - Coming Soon";
    const ledger = "Ledger - Coming Soon";

    return (
        <Navbar expand="lg" className={Classes.navbarBorder}>
            <Container className="navbar-containerr">
                <Link to="/" className={"navbar-brand"}>
                    <Image src={Logo} fluid/>
                </Link>
                <Nav className={`${Classes.linkTab} mb-2 mobile-show`}>
                            {/* <Link to="#home">Link 2</Link> */}
                    <span className="cross_ch">Cross-Chain Bridge Demo {/*<span className="betaa">Beta</span>*/}</span>
                </Nav>
                <Nav className={`${Classes.tabNav} d-md-block ml-auto mobile-ledger`}>
                    <Link to="#link">
                        <Image src={GreenDots} fluid/> Ledger <span className="coming-soon-i">Coming Soon</span>
                    </Link>
                </Nav>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className={Classes.basicNav}>
                    <Nav className={`${Classes.tabNav} d-none d-md-block center-of-navbar`}>
                        <NavLink exact={true} to="/" activeClassName={Classes.selected}>Transfer NFTs</NavLink>
                        <NavLink to="/transfer-liquidity" activeClassName={Classes.selected}>Tokens Transfer <span className="coming-soon-i">Coming Soon</span></NavLink>
                    </Nav>

                    <Nav className={`${Classes.linkTab} d-none d-md-block`}>
                        {/* <Link to="#home">Link 2</Link> */}
                        <span className="cross_ch">Cross-Chain Bridge Demo {/*<span className="betaa">Beta</span>*/}</span>
                    </Nav>

                    <Nav className={`${Classes.tabNav} d-none d-md-block ml-auto`}>
                        <Link to="#link">
                            <Image src={GreenDot} fluid/> Ledger <span className="coming-soon-i">Coming Soon</span>
                        </Link>
                    </Nav>


                    <Nav className={`${Classes.tabNavResponsive} d-md-none`}>
                        <Nav className={`${Classes.linkTab} mb-2`}>
                            {/* <Link to="#home">Link 2</Link> */}
                            <span className="cross_ch">Cross-Chain Bridge Demo {/*<span className="betaa">Beta</span>*/}</span>
                        </Nav>

                        <Link to="#link">
                            <Image src={GreenDot} fluid/> Ledger - <span className="coming-soon-i">Coming Soon</span>
                        </Link>
                    </Nav>
                </Navbar.Collapse>

                <Nav className={`${Classes.tabNav} ${Classes.resTabNav} d-lg-none mt-3 mobile-tab`}>
                    <NavLink exact={true} to="/" activeClassName={Classes.selected}>Transfer NFT</NavLink>
                    <NavLink to="/transfer-liquidity" activeClassName={Classes.selected}>Transfer Liquidity</NavLink>
                </Nav>
           
            </Container>
        </Navbar>

    );
};

export default NavBar;