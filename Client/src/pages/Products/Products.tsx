import { NavBar } from "../../components/NavBar";
import { Product } from "../../components/Product/Product";

export const Products = () => {
  return (
    <>
      <NavBar />
      <Product limit={60} />
    </>
  );
};
