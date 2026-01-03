import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Gallery from "./components/Gallery";
import PropertyPage from "./components/PropertyPage";
import "./App.css";

function App() {
  const [favourites, setFavourites] = useState([]); // global shared state

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Gallery favourites={favourites} setFavourites={setFavourites} />
        }
      />
      <Route
        path="/property/:id"
        element={
          <PropertyPage favourites={favourites} setFavourites={setFavourites} />
        }
      />
    </Routes>
  );
}

export default App;
