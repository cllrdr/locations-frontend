import { type FC } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";

export const HomePage: FC = () => (
  <Container className="py-5 text-center">
    <h1 className="display-4 fw-bold mb-4">Locactions Project</h1>
    <p className="lead mb-5">
      Добро пожаловать! Подберите идеальные локации для вашей игры.
    </p>
    <Link to={ROUTES.LOCATIONS} className="btn btn-primary btn-lg">
      Посмотреть локации
    </Link>
  </Container>
);

export default HomePage;