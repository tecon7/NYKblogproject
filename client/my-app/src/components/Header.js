import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Header({userStatus, handleLogout}) {

    return (
        <>
         <Navbar bg="primary" variant="dark">
        <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Navbar.Brand href="#home">Knicks</Navbar.Brand>
          <Nav className="me-auto"
          style={{ maxHeight: "100px" }}
          navbarScroll>
            <Nav.Link href="/">Player Data</Nav.Link>
            <Nav.Link href="/comments">Game Recaps</Nav.Link>
            <Nav.Link href="/highlights">Highlights</Nav.Link>
            {!userStatus.username ? <Nav.Link href="/login">Login</Nav.Link> : <Nav.Link href='/login'>You are logged in as: {userStatus.username}</Nav.Link>}
          </Nav>
          <Button variant="primary" onClick={handleLogout}>Log Out</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  </>
    )
}

export default Header
