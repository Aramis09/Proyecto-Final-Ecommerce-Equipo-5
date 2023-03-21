import React, { useState } from 'react';
//import { Option } from './types'; // O cualquier otro tipo de opción que necesites.


  
export const MakeGift: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState< string>("");
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setSelectedOption(value);
      
    };
    
    return (
      <div>
        <label htmlFor="make-gift-select">Do you wanna make a gift?</label>
        <select id="make-gift-select" value={selectedOption} onChange={handleSelectChange}>
          <option value="yes">Sí</option>
          <option value="no">No</option>
        </select>
      </div>
    );
  };
  
