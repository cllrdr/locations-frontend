import { type FC } from "react";
import { Card, Button } from "react-bootstrap";
import { type Locations } from "../modules/mock";

interface LocationCardProps extends Locations {
  imageClickHandler: () => void;
}

export const LocationCard: FC<LocationCardProps> = ({
  locationName, shortDescription, imagePath, imageClickHandler, similarity = 0
}) => (
  <Card style={{ height: "432px", display: "flex", flexDirection: "column" }}>
    <div onClick={imageClickHandler} style={{ cursor: "pointer", height: "144px", overflow: "hidden" }}>
      <Card.Img variant="top" src={imagePath} style={{ height: "100%", objectFit: "cover" }} />
    </div>
    <Card.Body style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Card.Title style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>{locationName}</Card.Title>
      <Card.Text style={{ flex: 1, fontSize: "0.875rem", marginBottom: "0.5rem", overflow: "hidden" }}>{shortDescription}</Card.Text>
      <div style={{ fontSize: "0.875rem", color: "#6c757d" }}>
        Similarity: {similarity}%
      </div>
    </Card.Body>
    <Card.Footer style={{ padding: "0.75rem" }}>
      <Button variant="outline-light" onClick={imageClickHandler} style={{ width: "100%" }}>
        Выбрать
      </Button>
    </Card.Footer>
  </Card>
);

export default LocationCard;