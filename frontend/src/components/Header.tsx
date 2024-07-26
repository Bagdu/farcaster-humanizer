import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar expand="md" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {/*<Image src="/images/logo-small.png" height={28} className="me-2" />*/}
          Farcaster humanizer
        </Navbar.Brand>
        <div className="ms-auto">
          <w3m-button />
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2" />
      </Container>
    </Navbar>
  );
}

export default Header;
