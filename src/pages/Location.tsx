import { type FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Row, Image, Button } from "react-bootstrap";
import { LOCATIONS_MOCK, type Locations } from "../modules/mock";
import defaultImage from "../assets/DefaultImage.png";

export const LocationPage: FC = () => {
  const [location, setLocation] = useState<Locations | undefined>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    // Ищем локацию в моках по ID
    const found = LOCATIONS_MOCK.find(
      (loc) => String(loc.locationId) === id
    );
    setLocation(found);
  }, [id]);

  if (!location) {
    return (
      <div className="container py-5">
        <BreadCrumbs
          crumbs={[
            { label: ROUTE_LABELS.LOCATIONS, path: ROUTES.LOCATIONS },
            { label: "Локация не найдена" },
          ]}
        />
        <div className="text-center py-5">
          <h2>Локация не найдена</h2>
          <Button variant="primary" onClick={() => navigate(ROUTES.LOCATIONS)}>
            Вернуться к списку
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.LOCATIONS, path: ROUTES.LOCATIONS },
          { label: location.locationName },
        ]}
      />
      
      <Row className="mt-4">
        <Col md={6}>
          <Image
            src={location.imagePath || defaultImage}
            alt={location.locationName}
            fluid
            rounded
          />
        </Col>
        <Col md={6}>
          <h1>{location.locationName}</h1>
          <p>
            <strong>Игроков:</strong> {location.playersCount}
          </p>
          {location.shortDescription && (
            <p>{location.shortDescription}</p>
          )}
          {location.description && (
            <p>{location.description}</p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default LocationPage;