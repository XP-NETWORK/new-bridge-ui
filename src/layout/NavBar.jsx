import React from 'react';
import {Navbar, Container, Nav, Image} from 'react-bootstrap';
import Logo from '../assets/images/mainLogo.svg';
import GreenDot from '../assets/images/greenDot.svg';
import {Link} from "react-router-dom";
import Classes from './NavBar.module.css';

const NavBar = () => {
    return (
        <Navbar expand="lg" className={Classes.navbarBorder}>
            <Container>
                <Link to="/xp-network" className={"navbar-brand"}>
                    <Image src={Logo} fluid/>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className={Classes.basicNav}>
                    <Nav className={Classes.tabNav}>
                        <Link to="#home">Transfer NFT</Link>
                        <Link to="#link">Transfer Liquidity</Link>
                    </Nav>

                    <Nav className={`${Classes.linkTab} ml-auto`}>
                        <Link to="#home">Link 2</Link>
                        <Link to="#link">Link 1</Link>
                    </Nav>

                    <Nav className={Classes.tabNav}>
                        <Link to="#link">
                            <Image src={GreenDot} fluid/> Ledger
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
