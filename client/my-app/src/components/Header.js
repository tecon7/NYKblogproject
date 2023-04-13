import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header({userStatus}) {

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
            <Nav.Link href="/comments">Article</Nav.Link>
            <Nav.Link href="/">Highlights</Nav.Link>
            {!userStatus.username ? <Nav.Link href="/login">Login</Nav.Link> : <Nav.Link href='/login'>You are logged in as: {userStatus.username}</Nav.Link>}
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div class="wrapper">
        <div class="container">
            <h1>We are the NY Knicks!</h1>
            <em style={{ color: 'white'}}>A diehard fan's blog to vent about the last 20 years of NY Basketball</em>
        </div>
    </div>
  </>
    )
}

export default Header
