import { type FC, useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import InputField from "../components/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import LocationCard from "../components/LocationCard";
import { useNavigate } from "react-router-dom";
import { locationsService, type Locations } from "../services/locationsService";
import FloatingCart from "../components/FloatingCart";
import defaultImage from "../assets/defaultImage.png"

export const LocationsList: FC = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Locations[]>([]);
  const [allLocations, setAllLocations] = useState<Locations[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      const data = await locationsService.getLocations();
      setAllLocations(data);
      setItems(data);
      setLoading(false);
    };
    fetchLocations();
  }, []);

  const handleSearch = async () => {
    if (!search.trim()) {
      setItems(allLocations);
      return;
    }
    setLoading(true);
    const data = await locationsService.getLocations(search);
    setItems(data);
    setLoading(false);
  };

  return (
    <Container fluid className="py-4 px-5">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.LOCATIONS }]} />
      <InputField value={search} setValue={setSearch} loading={loading} onSubmit={handleSearch} />
      
      {loading && <div className="loading-spinner"><Spinner animation="border" /></div>}
      {!loading && items.length === 0 && (
        <Alert variant="info" className="text-center">Ничего не найдено</Alert>
      )}

      <div className="cards-grid">
        {items.map(loc => (
          <LocationCard key={loc.locationId} {...loc} imagePath={loc.imagePath || defaultImage} imageClickHandler={() => navigate(`${ROUTES.LOCATIONS}/${loc.locationId}`)} />
        ))}
      </div>
      <FloatingCart />
    </Container>
  );
};