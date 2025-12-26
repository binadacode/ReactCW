import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import PropertyPage from "./components/PropertyPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/property/:id" element={<PropertyPage />} />
    </Routes>
  );
}

export default App;
