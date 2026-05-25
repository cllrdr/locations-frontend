import { type FC } from "react";
import { Button, Card } from "react-bootstrap";
//import "./LocationCard.css";
import defaultImage from "../assets/DefaultImage.png"

interface LocationCardProps {
  imagePath: string;
  locationName: string;
  shortDescription: string;
  imageClickHandler: () => void;
}

export const LocationCard: FC<LocationCardProps> = ({
  imagePath,
  locationName,
  shortDescription,
  imageClickHandler,
}) => {

  return (
    <Card className="card">
      <Card.Img
        className="cardImage"
        variant="top"
        src={imagePath || defaultImage}
        height={100}
        width={100}
        onClick={imageClickHandler}
      />
      <Card.Body>
        <div className="textStyle">
          <Card.Title>{locationName}</Card.Title>
        </div>
        <div className="textStyle">
          <Card.Text>{shortDescription}</Card.Text>
        </div>
        <Button
          className="cardButton"
          target="_blank"
          variant="primary"
        >
          Подробнее
        </Button>
      </Card.Body>
    </Card>
  );
};