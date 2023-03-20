import React, {useState} from "react";
import axios from "axios";

// const handleClick = () => {

//     const data = {
//         userEmail: 'nymnym@gmail.com'
//     }

//     const res = axios.get('/traemeMisAmigos')
// }


type SelectProps = {
    options: { label: string; value: string }[];
    defaultValue?: string;
    onChange?: (value: string) => void;
  };
  
  const Select: React.FC<SelectProps> = ({ options, defaultValue, onChange }) => {
    const [value, setValue] = useState(defaultValue || '');
  
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = event.target.value;
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    };
  
    return (
      <select value={value} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };


/*
 <h4 className={styles.title}>
                  ¿Do you want to use a new email for the purchase?
                </h4>
                <button
                  className={styles['form-button']}
                  onClick={(ev) => handleButOpen(ev)}>
                  Yes
                </button>
*/
