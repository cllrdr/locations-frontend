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
import { useLocationSearch } from "../hooks/useLocationSearch";

export const LocationsList: FC = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [allLocations, setAllLocations] = useState<Locations[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  const { items, ready, searchByImage, resetSearch } = useLocationSearch(allLocations);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const data = await locationsService.getLocations();
        // Добавляем id если его нет
        const dataWithId = data.map(item => ({
          ...item,
          id: item.id || item.locationId,
          similarity: item.similarity || 0
        }));
        setAllLocations(dataWithId);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const handleSearch = async () => {
    if (!search.trim()) {
      resetSearch();
      return;
    }
    setLoading(true);
    try {
      const data = await locationsService.getLocations(search);
      const dataWithId = data.map(item => ({
        ...item,
        id: item.id || item.locationId,
        similarity: 0
      }));
      setAllLocations(dataWithId);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSearching(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      searchByImage(file);
      setTimeout(() => setSearching(false), 1000);
    }
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    resetSearch();
  };

  return (
    <Container fluid className="py-4 px-5">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.LOCATIONS }]} />
      <InputField value={search} setValue={setSearch} loading={loading} onSubmit={handleSearch} />

      <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <h5>Загрузить изображение для сравнения</h5>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={searching}
          style={{ marginBottom: "1rem" }}
        />
        {searching && <div style={{ marginTop: "1rem" }}><Spinner animation="border" size="sm" /> Обработка изображения...</div>}
        {uploadedImage && (
          <div style={{ marginTop: "1rem" }}>
            <img
              src={uploadedImage}
              alt="Uploaded"
              style={{ maxWidth: "200px", maxHeight: "200px", marginBottom: "1rem", borderRadius: "4px" }}
            />
            <br />
            <button
              onClick={handleClearImage}
              style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
              disabled={searching}
            >
              Удалить изображение
            </button>
          </div>
        )}
      </div>

      {loading && <div className="loading-spinner"><Spinner animation="border" /></div>}
      {!loading && items.length === 0 && (
        <Alert variant="info" className="text-center">Ничего не найдено</Alert>
      )}

      <div className="cards-grid">
        {items.filter(loc => !uploadedImage || (loc.similarity || 0) >= 52).map(loc => (
          <LocationCard key={loc.locationId} {...loc} imagePath={loc.imagePath || defaultImage} imageClickHandler={() => navigate(`${ROUTES.LOCATIONS}/${loc.locationId}`)} />
        ))}
      </div>
      <FloatingCart />
    </Container>
  );
};