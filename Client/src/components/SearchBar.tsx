export const SearchBar = () => {

    const handleClickSubmit = (event:any) => {
        event.preventDefault();
        
    }

    const handleInputChange = (event:any) => {
        event.preventDefault();

    }


    return (
        <div>
            <input type="text" placeholder="Search Video Games" onChange={handleInputChange} />
            <button type="submit" onClick={handleClickSubmit}>Search</button>
        </div >
    )
}