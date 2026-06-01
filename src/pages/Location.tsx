import { type FC, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useParams, useNavigate } from "react-router-dom";
import { locationsService, type Locations } from "../services/locationsService";

export const LocationPage: FC = () => {
  const [loc, setLoc] = useState<Locations | undefined>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      locationsService.getLocationById(id).then(setLoc);
    }
  }, [id]);

  if (!loc) return (
    <Container className="py-5 text-center">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.LOCATIONS, path: ROUTES.LOCATIONS }, { label: "Не найдено" }]} />
      <h2 className="mt-4">Локация не найдена</h2>
      <Button variant="outline-light" onClick={() => navigate(ROUTES.LOCATIONS)}>Назад</Button>
    </Container>
  );

  return (
    <Container className="py-4">
      <BreadCrumbs crumbs={[
        { label: ROUTE_LABELS.LOCATIONS, path: ROUTES.LOCATIONS },
        { label: loc.locationName }
      ]} />

      <Row className="mt-4 justify-content-center">
        <Col md={8} lg={6}>
          <div className="reel-wrapper">
            {loc.videoPath ? (
              <video src={loc.videoPath} autoPlay loop muted />
            ) : (
              <img src={loc.imagePath} alt={loc.locationName} />
            )}
            <div className="reel-players">
              <span>👥</span>
              <span>{loc.playersCount}</span>
            </div>
            <div className="reel-info">
              <h1 className="reel-title">{loc.locationName}</h1>
              <p className="reel-description">{loc.description}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};