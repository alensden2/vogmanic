import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/landing/home";
import ContactPage from "./pages/ContactPage";
import Faq from "./pages/landing/faq";
import Store from "./pages/store";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
