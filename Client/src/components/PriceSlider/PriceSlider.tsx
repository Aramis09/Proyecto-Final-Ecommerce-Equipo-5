import { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { selectedFilterPriceRange } from "../../redux/reducer/productReducer";


export const PriceSlider = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);

  const dispatch = useAppDispatch();

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPriceRange = [event.target.valueAsNumber, priceRange[1]];
    setPriceRange(newPriceRange);
  };

  useEffect(() => {
    dispatch(selectedFilterPriceRange(priceRange))
  }, [priceRange])

  return (
    <div>
      <div>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={priceRange[0]}
          onChange={handlePriceRangeChange}
        />
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={priceRange[1]}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPriceRange([priceRange[0], event.target.valueAsNumber])
          }
        />
      </div>
      <div>
        <span>{`Desde: $ ${priceRange[0]}`}</span>
        <br />
        <span>{`Hasta: $ ${priceRange[1]}`} </span>
      </div>
    </div>
  );
};
