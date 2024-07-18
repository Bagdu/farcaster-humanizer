import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar expand="md" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image src="/images/logo-small.png" height={28} className="me-2" />
          WorldWote
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/vote">
              Vote
            </Nav.Link>
            <Nav.Link as={Link} to="/results">
              Results
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className="ms-auto">
          <w3m-button />
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2" />
      </Container>
    </Navbar>
  );
}

export default Header;
