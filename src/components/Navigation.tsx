import { type FC } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";

export const Navigation: FC = () => (
  <Navbar className="py-2 mb-3">
    <Container>
      <Navbar.Brand as={Link} to={ROUTES.HOME}>
        Locactions
      </Navbar.Brand>
      <Link to={ROUTES.LOCATIONS} className="btn btn-outline-light">
        Все локации
      </Link>
    </Container>
  </Navbar>
);

export default Navigation;