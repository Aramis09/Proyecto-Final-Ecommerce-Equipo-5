import { Home } from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Products } from "./pages/Products/Products";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
