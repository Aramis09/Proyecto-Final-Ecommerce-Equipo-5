import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";
import { Detail } from "./components/Detail/Detail";
import "./App.css";
import { CheckOut } from "./pages/CheckOut/CheckOut";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/games" element={<Detail />} />
          <Route path='/checkout' element={<CheckOut />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;