import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

// Navbar component to be rendered on page top.
// Uses react-bootstrap to handle behavior on small screens
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
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

/*
    Removing this header link as I couldn't implement the page it led to

    <LinkContainer to="/favorites" eventKey={2}>
        <NavItem>Favorites</NavItem>
    </LinkContainer>
*/

export default AppHeader;
