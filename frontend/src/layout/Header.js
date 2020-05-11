import React,{useState} from 'react';

import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Button, Container} from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="header-section">
      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand href="/">NotesApp</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
            </Nav>
            <NavLink href="/login">Login</NavLink>
            <NavLink href="/registration">Registration</NavLink>
            <NavLink href="/add-notes">Add Notes</NavLink>
            <NavLink href="/">Me</NavLink>
            <Button color="primary">Logout</Button>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;