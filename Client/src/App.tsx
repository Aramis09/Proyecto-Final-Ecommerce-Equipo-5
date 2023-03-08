import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";
import { Detail } from "./components/Detail/Detail";
import "./App.css";
import { CheckOut } from "./pages/CheckOut/CheckOut";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";
import { getTopRatedProducts } from "./redux/actions/productAction";
import MPButton  from "./components/ButtonPayMP/buttonMP";

function App() {

  let searchedName = useAppSelector((state) => state.productReducer.searchedName)

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTopRatedProducts())
  }, [])
  
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/:id" element={<Detail />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/pay' element={<MPButton />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;