import { useState } from 'react';

export const SearchBar = () => {
	//importar y crear su variable para utilizar
	const [Search, setSearch] = useState('');

	const handleClickSubmit = (event: any) => {
		event.preventDefault();
		//dispatch de la action pasandole el estado Search
	};

	const handleInputChange = (event: any) => {
		event.preventDefault();
		setSearch(event.target.value);
	};

	return (
		<div className='Search'>
			<input
				className='Input'
				type='text'
				placeholder='Search Video Games'
				onChange={(event) => handleInputChange(event)}
			/>
			<button
				className='But'
				type='submit'
				onClick={(event) => handleClickSubmit(event)}>
				Search
			</button>
		</div>
	);
};
