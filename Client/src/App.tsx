import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";
import { Detail } from "./components/Detail/Detail";
import "./App.css";
import { CheckOut } from "./pages/CheckOut/CheckOut";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";
import { getTopRatedProducts } from "./redux/actions/productAction";

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
          <Route path="/" element={ searchedName? <Navigate to='/products' /> : <Home /> } /> 
          <Route path="/products" element={<Products />} />
          <Route path="/:id" element={searchedName? <Navigate to='/products' /> : <Detail />} />
          <Route path='/checkout' element={<CheckOut />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;