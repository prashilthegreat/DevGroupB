import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';

const Header = () => {
    const [user, loading, error] = useAuthState(auth);
    console.log(user);
    return (
        <Navbar sticky='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to='/'>Dream Photography</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/blogs'>Blogs</Nav.Link>
                        <Nav.Link as={Link} to='/about'>About Me</Nav.Link>

                    </Nav>
                    <Nav>

                        {
                            user ? <>
                                <img src={user?.photoURL} alt="" className='rounded-circle my-auto mx-2' width={30} height={30} />
                                <p className="text-white my-auto">{user?.displayName}</p>
                                <button
                                    onClick={() => signOut(auth)}
                                    className="btn btn-link text-decoration-none">
                                    Signout
                                </button>

                            </>
                                :
                                <>
                                    <Nav.Link as={Link} to="/login">
                                        Login
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/register">
                                        Register
                                    </Nav.Link>
                                </>

                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;