import { type FC, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import InputField from "../components/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import LocationCard from "../components/LocationCard";
import { useNavigate } from "react-router-dom";
import { LOCATIONS_MOCK } from "../modules/mock";
import FloatingCart from "../components/FloatingCart";

const LocationsService = {
  searchByName: (q: string) =>
    LOCATIONS_MOCK.filter(l => l.locationName.toLowerCase().includes(q.toLowerCase()))
};

export const LocationsList: FC = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(LOCATIONS_MOCK);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) { setItems(LOCATIONS_MOCK); return; }
    setLoading(true);
    setItems(LocationsService.searchByName(search));
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
          <LocationCard key={loc.locationId} {...loc} imageClickHandler={() => navigate(`${ROUTES.LOCATIONS}/${loc.locationId}`)} />
        ))}
      </div>
      <FloatingCart />
    </Container>
  );
};