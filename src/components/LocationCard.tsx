import { type FC } from "react";
import { Card, Button } from "react-bootstrap";
import { type Locations } from "../modules/mock";

interface LocationCardProps extends Locations {
  imageClickHandler: () => void;
}

export const LocationCard: FC<LocationCardProps> = ({
  locationName, shortDescription, imagePath, imageClickHandler
}) => (
  <Card>
    <div onClick={imageClickHandler} style={{ cursor: "pointer" }}>
      <Card.Img variant="top" src={imagePath} />
      <Card.Body>
        <Card.Title>{locationName}</Card.Title>
        <Card.Text>{shortDescription}</Card.Text>
      </Card.Body>
    </div>
    <Card.Footer>
      <Button variant="outline-light" onClick={imageClickHandler} style={{ width: "100%" }}>
        Выбрать
      </Button>
    </Card.Footer>
  </Card>
);

export default LocationCard;