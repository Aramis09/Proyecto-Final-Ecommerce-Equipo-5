import { useState } from 'react';
import style from './SearchBar.module.scss';


export const SearchBar = () => {
	const [Search, setSearch] = useState('');

	const handleClickSubmit = (event: any) => {
		event.preventDefault();
    // dispatch(ProductsByName(Search));
	};

	const handleInputChange = (event: any) => {
		event.preventDefault();
		setSearch(event.target.value);
	};

	return (
		<div className='Search'>
      <input
        className={style.Input}
        type='text'
        placeholder='Search Video Games'
        onChange={(event) => handleInputChange(event)}
      />
			<button
				className={style.But}
				type='submit'
				onClick={(event) => handleClickSubmit(event)}>
				SEARCH
			</button>
		</div>
	);
};
