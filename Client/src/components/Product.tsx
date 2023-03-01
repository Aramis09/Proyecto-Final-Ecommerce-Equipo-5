import { PRUEBA } from "../prueba";
import { MediaCard } from "./MediaCard";

export const Product = () => {

  console.log('h')
  return (
    <>
      {PRUEBA.map((product) => {
        return (
          <>
            {/* <div>{product.id}</div>
            <h3>{product.name}</h3>
            <img src={product.background_image} alt={product.name} />
            {product.platforms.map((platform) => {
              return (
                <ul>
                  <li>{platform}</li>
                </ul>
              );
            })}
            {product.price === "free" ? (
              <p>{`${product.price}`}</p>
            ) : (
              <p>{`$${product.price}`}</p>
            )} */}

            <MediaCard
              id={product.id} 
              name={product.name}
              background_image={product.background_image}
              description={product.description}
              platforms={product.platforms}
              price={product.price}
            />
          </>
        );
      })}
    </>
  );
};
