import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarComp() {
  const token = localStorage.getItem('token');
  const isAuthenticated = token == null;

  return (
    <>
      <Navbar bg="light" data-bs-theme="light" className=''>
        <Container>
          <Navbar.Brand href="/">Lifegram</Navbar.Brand>
          <Nav className="d-flex ">
            <Nav.Link href="/">Home</Nav.Link>
            {isAuthenticated ? (
              <Nav.Link href="/login">Login</Nav.Link>
              ) : ( 
                <Nav.Link href="/profile">Profile</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}