import { Container, Navbar, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="bg-body-tertiary bg-opacity-75"
      style={{
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container>
        <div className="ms-0">
          <Image src="/images/world-coin-logo.jpg" height={28} className="me-lg-3" />
        </div>
        <Navbar.Brand as={Link} to="/">
          <Image src="/images/farcaster-logo.jpg" height={28} className="me-lg-5" />
          Farcaster Humanizer
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
