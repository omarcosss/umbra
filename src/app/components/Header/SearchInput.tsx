export default function SearchInput(){
    return(
        <div className="search-input-container">
            <input type="search" name="search" id="search" className="search-input" placeholder=" "/>
            <label htmlFor="search" className="search-input-label">Buscar</label>
        </div>
    );
}