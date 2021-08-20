import React from 'react';
import {Navbar, Container, Nav, Image} from 'react-bootstrap';
import Logo from '../assets/images/mainLogo.svg';
import GreenDot from '../assets/images/greenDot.svg';
import {Link, NavLink} from "react-router-dom";
import Classes from './NavBar.module.css';

const NavBar = () => {

    const transferTokens = "Tokens Transfer - Coming Soon";
    const ledger = "Ledger - Coming Soon";

    return (
        <Navbar expand="lg" className={Classes.navbarBorder}>
            <Container>
                <Link to="/" className={"navbar-brand"}>
                    <Image src={Logo} fluid/>
                </Link>

                <Nav className={`${Classes.tabNavResponsive} d-md-none`}>
                    <Link to="#link">
                        <Image src={GreenDot} fluid/> {ledger}
                    </Link>
                </Nav>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className={Classes.basicNav}>
                    <Nav className={`${Classes.tabNav} d-none d-md-block`}>
                        <NavLink exact={true} to="/" activeClassName={Classes.selected}>Transfer NFT</NavLink>
                        <NavLink to="/transfer-liquidity" activeClassName={Classes.selected}>{transferTokens}</NavLink>
                    </Nav>

                    <Nav className={`${Classes.linkTab} ml-auto`}>
                        {/* <Link to="#home">Link 2</Link> */}
                        <Link to="#link">Cross-Chain Bridge Demo</Link>
                    </Nav>

                    <Nav className={`${Classes.tabNav} d-none d-md-block`}>
                        <Link to="#link">
                            <Image src={GreenDot} fluid/> {ledger}
                        </Link>
                    </Nav>
                </Navbar.Collapse>

                <Nav className={`${Classes.tabNav} ${Classes.resTabNav} d-md-none mt-3`}>
                    <NavLink exact={true} to="/" activeClassName={Classes.selected}>Transfer NFT</NavLink>
                    <NavLink to="/transfer-liquidity" activeClassName={Classes.selected}>{transferTokens}</NavLink>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;