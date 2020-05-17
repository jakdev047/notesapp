import React,{useState} from 'react';

import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Button, Container} from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';

const Header = ({auth,logout}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const {isAuthenticated,isLoading} = auth;

  return (
    <div className="header-section">
      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand href="/">NotesApp</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem><NavLink href="/">Home</NavLink> </NavItem>
            </Nav>

            {
              !isLoading && isAuthenticated ?  

              <>
                <NavLink href="/add-notes">Add Notes</NavLink>
                <NavLink href="/users/a">Me</NavLink>
                <Button onClick={logout} color="primary">Logout</Button>
              </> :

              (
                <>
                  <NavLink href="/login">Login</NavLink>
                  <NavLink href="/registration">Registration</NavLink>
                </>
              )

            }

          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps,{logout})(Header);
