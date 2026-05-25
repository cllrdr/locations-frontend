import { type FC, useState, useMemo } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import InputField from "../components/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { LocationCard } from "../components/LocationCard";
import { useNavigate } from "react-router-dom";
import { LOCATIONS_MOCK, type Locations } from "../modules/mock";

// 🔹 Сервисный слой — легко заменить на реальный API позже
const LocationsService = {
  searchByName: (query: string): Locations[] => {
    return LOCATIONS_MOCK.filter((loc) =>
      loc.locationName.toLowerCase().includes(query.toLowerCase())
    );
  },
};

const LocationsList: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<Locations[]>(LOCATIONS_MOCK);
  const [isSearched, setIsSearched] = useState(false);

  const navigate = useNavigate();

  // 🔹 Поиск с загрузкой
  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setLocations(LOCATIONS_MOCK);
      setIsSearched(false);
      return;
    }

    setLoading(true);
    setIsSearched(true);
    
    try {
      const results = await LocationsService.searchByName(searchValue);
      setLocations(results);
    } catch (error) {
      console.error("Search error:", error);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Live-фильтрация (опционально, если нужен поиск "на лету")
  const filteredLocations = useMemo(() => {
    if (!isSearched) return locations;
    return locations.filter((loc) =>
      loc.locationName.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [locations, searchValue, isSearched]);

  const handleCardClick = (id: number) => {
    navigate(`${ROUTES.LOCATIONS}/${id}`);
  };

  const handleReset = () => {
    setSearchValue("");
    setLocations(LOCATIONS_MOCK);
    setIsSearched(false);
  };

  return (
    <div className="container py-4">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.LOCATIONS }]} />
      
      <div className="mb-4">
        <InputField
          value={searchValue}
          setValue={setSearchValue}
          loading={loading}
          onSubmit={handleSearch}
          placeholder="Поиск по названию локации..."
        />
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Загрузка локаций...</p>
        </div>
      ) : filteredLocations.length === 0 ? (
        <div className="text-center py-5">
          <h4>🔍 Ничего не найдено</h4>
          <p className="text-muted">
            {searchValue 
              ? `По запросу "${searchValue}" локаций не найдено` 
              : "Локации пока не добавлены"}
          </p>
          {isSearched && (
            <button className="btn btn-outline-secondary" onClick={handleReset}>
              Сбросить фильтр
            </button>
          )}
        </div>
      ) : (
        <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
          {filteredLocations.map((location) => (
            <Col key={location.locationId}>
              <LocationCard
                {...location}
                imageClickHandler={() => handleCardClick(location.locationId)}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default LocationsList;