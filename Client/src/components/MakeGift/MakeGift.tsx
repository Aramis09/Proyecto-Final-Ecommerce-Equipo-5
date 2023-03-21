import React, { useState } from 'react';
//import { Option } from './types'; // O cualquier otro tipo de opción que necesites.

interface Props {
    onSelect: (option: any) => void;
  }
  
  const MakeGift: React.FC<Props> = ({ onSelect }) => {
    const [selectedOption, setSelectedOption] = useState< string>("");
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setSelectedOption(value);
      onSelect(value);
    };
    
    return (
      <div>
        <label htmlFor="make-gift-select">¿Quieres hacer un regalo?</label>
        <select id="make-gift-select" value={selectedOption} onChange={handleSelectChange}>
          <option>Seleccione una opción</option>
          <option value="yes">Sí</option>
          <option value="no">No</option>
        </select>
      </div>
    );
  };
  
  export default MakeGift;
