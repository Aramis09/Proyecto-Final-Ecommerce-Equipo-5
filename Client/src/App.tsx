import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";
import { Detail } from "./components/Detail/Detail";
import { CheckOut } from "./pages/CheckOut/CheckOut";
import { Transaccion } from "./pages/mercadoPagoTesting/mpLink";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";
import { getListUsers } from "./redux/actions/userAction";
import { getTopRatedProducts, setGlobalDiscount } from "./redux/actions/productAction";
import { DashboardUser } from "./components/Dashboard/Users/DashboardUser";
import { DashboardProducts } from "./components/Dashboard/ProductsList/DashboardProducts";
import "./App.css";
import { Friends } from "./pages/Friends/Friends";

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAuth0();
  const userEmail = user?.email;

  const listUsersData = useAppSelector(
    (state) => state.userReducer.listUsersData
  );

  const admin = listUsersData.find((item) => item.email === userEmail);
  if (admin) {
    const isAdmin = admin.admin;
    console.log(
      `El usuario ${userEmail} tiene permisos de administrador: ${isAdmin}`
    );
  } else {
    console.log(`El usuario ${userEmail} no se encuentra en la lista`);
  }

  useEffect(() => {
    dispatch(getTopRatedProducts());
    dispatch(getListUsers());
    dispatch(setGlobalDiscount())
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {admin?.admin && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/:id" element={<Detail />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/mptest" element={<Transaccion />} />
              <Route path="/users" element={<DashboardUser />} />
              <Route path="/productsList" element={<DashboardProducts />} />
            </>
          )}
          {!admin?.admin && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/:id" element={<Detail />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/mptest" element={<Transaccion />} />
              <Route path="/friends" element={<Friends />} />

            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
