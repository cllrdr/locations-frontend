import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LocationPage } from "./pages/Location";
import LocationsList from "./pages/Locations"
import { ROUTES } from "../Routes";
import { HomePage } from "./pages/Home";
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
    <Navigation/>
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.LOCATIONS} element={<LocationsList />} />
        <Route path={`${ROUTES.LOCATIONS}/:id`} element={<LocationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;