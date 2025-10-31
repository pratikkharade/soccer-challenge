import React, { Component, useEffect, useState } from 'react';
import { fetchDataAPI, searchItemsAPI } from "../../APIs/apis";
import "./Search.css"

function Search(props) {
    const [searchValue, setSearchValue] = useState('');
    const [selectedAttr, setSelectedAttr] = useState(props.attributes[0] || "");

    // Update the selected attribute when the attributes prop changes
    useEffect(() => {
        setSelectedAttr(props.attributes[0]);
    }, [props.attributes]);
    
    // Perform search based on selected attribute and search value
    const search = async () => {
        const results = await searchItemsAPI(selectedAttr, searchValue);
        props.applySearchResults(results);
    }

    // Reset the search and fetch all data again
    const reset = async () => {
        const data = await fetchDataAPI();
        props.applySearchResults(data);
        setSelectedAttr(props.attributes[0]);
        setSearchValue("");
    }
    
    return (
        <div className="search-wrapper">
            <div className='search-fields'>
            <select
                value={selectedAttr}
                onChange={(e) => setSelectedAttr(e.target.value)}
            >
                {props.attributes.map((attr, idx) => (
                    <option key={idx} value={attr}>
                        {attr}
                    </option>
                ))}
            </select>
            <input
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
            />
            </div>
            <div className='search-buttons'>
            <button onClick={search} >Search</button>
            <button onClick={reset} >Reset</button>
            </div>
        </div>
    )
}

export default Search;