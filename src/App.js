import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/landing/home";
import ContactPage from "./pages/ContactPage";
import Faq from "./pages/landing/faq";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
