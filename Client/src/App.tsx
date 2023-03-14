import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";
import { Detail } from "./components/Detail/Detail";
import "./App.css";
import { CheckOut } from "./pages/CheckOut/CheckOut";
import { Transaccion } from "./pages/mercadoPagoTesting/mpLink";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks/hooks";
import { getTopRatedProducts } from "./redux/actions/productAction";


function App() {

  const dispatch = useAppDispatch();
  
  
  useEffect(() => {
    dispatch(getTopRatedProducts())
  }, [])
  

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Home /> } /> 
          <Route path="/products" element={<Products />} />
          <Route path="/:id" element={ <Detail />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/mptest' element={<Transaccion />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
