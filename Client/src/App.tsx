import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";
import { Detail } from "./components/Detail/Detail";
import { CheckOut } from "./pages/CheckOut/CheckOut";
import { Transaccion } from "./pages/mercadoPagoTesting/mpLink";
import { DiscountManager } from "./components/discountManager/DiscountManager";
import { PaymentFailed } from "./pages/paymentFailed/PaymentFailed";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";

import { getListUsers, saveNewUser } from "./redux/actions/userAction";

import {
  getTopRatedProducts,
  setGlobalDiscount,
} from "./redux/actions/productAction";

import { setAutoGlobalDiscount } from "./redux/reducer/productReducer";

import { DashboardUser } from "./components/Dashboard/Users/DashboardUser";
import { DashboardProducts } from "./components/Dashboard/ProductsList/DashboardProducts";
import WishList from "./pages/WishList/WishList";
import "./App.css";
import { Friends } from "./pages/Friends/Friends";
import Library from "./pages/library/Library";

import { setShoppingCartFromLocalStorage } from "./redux/actions/localStorageAction";
import { getShoppingCartUserFromDB } from "./redux/actions/shoppingCartAction";
import { DashboardSales } from "./components/Dashboard/Sales/DashboardSales";
import NavbarPhone from "./phone/navBarPhone/navBarPhone";

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAuth0();
  const userEmail = user?.email;

  const listUsersData = useAppSelector(
    (state) => state.userReducer.listUsersData
  );
  let discountGloballyApplied = useAppSelector(
    (state) => state.productReducer.discountGloballyApplied
  );
  let adminDiscount = useAppSelector(
    (state) => state.productReducer.adminDiscount
  );

  const admin = listUsersData.find((item) => item.email === userEmail);
  
  useEffect(() => {
    dispatch(getTopRatedProducts());

    dispatch(getListUsers()); // este falla no se porque, rompe cosas
    if (typeof user !== "undefined") {
      dispatch(getShoppingCartUserFromDB(user.email));
    } else {
      dispatch(setShoppingCartFromLocalStorage());
    }
  }, []);

  useEffect(() => {
    if (!discountGloballyApplied && !adminDiscount) {
      dispatch(setGlobalDiscount());
      dispatch(setAutoGlobalDiscount(true));
    }

  }, [discountGloballyApplied]);

  useEffect(() => {
    if (user !== undefined) {
      dispatch(saveNewUser(user.email, user.name, user.picture));
    }

  }, [user]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/mptest" element={<Transaccion />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/failure" element={<PaymentFailed />} />
          <Route path="/wish" element={<WishList />} />
          <Route path="/library" element={<Library />} />
          <Route path="/phone" element={<NavbarPhone />} />
          <Route path="/:id" element={<Detail />} />
          {admin?.admin && (
            <>
              <Route path="/users" element={<DashboardUser />} />
              <Route path="/productsList" element={<DashboardProducts />} />
              <Route path="/sales" element={<DashboardSales/>}/>
              <Route path="/discMan" element={<DiscountManager />} />
            </>
          )}
        </Routes>
        <Outlet />
      </div>
    </BrowserRouter>
  );
}

export default App;
