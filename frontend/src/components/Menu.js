import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'


const Menu = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
  <Container>
    <Navbar.Brand href="/">Chatty</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default Menu