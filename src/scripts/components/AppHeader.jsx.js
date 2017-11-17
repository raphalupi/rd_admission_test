import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const AppHeader = () => (
    <Navbar collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/">RD::BOOKS</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <LinkContainer to="/" eventKey={1} exact>
                    <NavItem>Home</NavItem>
                </LinkContainer>
                <LinkContainer to="/favorites" eventKey={2}>
                    <NavItem>Favorites</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default AppHeader;