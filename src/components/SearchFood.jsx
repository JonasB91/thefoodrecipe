import React, { useState, useRef } from 'react';
import '../css/SearchFood.css';
import FoodCard from './FoodCard';
import FoodDetails from './FoodDetails';

function SearchFood() {
    const [searchFood, setSearchFood] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMeal, SetSelectedMeal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showFoodDetails, SetShowFoodDetails] = useState(false) // låter mig kolla om jag ska visa food details eller inte
    const [searchError, setSearchError] = useState(null); // State för att hantera search field error messege,
    const searchRef = useRef(null); // Sätter State för useRef

    // eventhandler för att söka
    const handleSearchChange = (event) => {
        setSearchFood(event.target.value);
        //Rensa tidigare search error messege när en user börjar skriva igen.
        setSearchError(null);
    };
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        //Validation for search input,
        if(searchRef.current.value.trim() === '') {
            setSearchError('ERROR; Please enter a food dish!'); // sätter error messege här
            searchRef.current.focus()  // fokus på inputfield
                return;
        }

        setLoading(true);
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFood}`);
            const data = await response.json();
            setSearchResults(data.meals);
            console.log(data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };

    
    const foodCardClickHandler = (meal) => {
        SetSelectedMeal(meal);
        SetShowFoodDetails(true) // visar fooddetails när ett foodcard är clicked
        
    };

    const closeDetailsHandler = () => {
        SetSelectedMeal(null);
        SetShowFoodDetails(false) // Gömmer food details när du kör cancel knapp,
    }


    return (
        <div className="banner-container">
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <input
                 ref={searchRef}
                 className="input-field"
                 type="text" value={searchFood} 
                 onChange={handleSearchChange}
                />
                <button className="search-btn" type="submit">Search</button>
            </form>
        </div>
        {searchError && (
            <div className='error-message-container'>
                <p className='error-message'>{searchError}</p>
                </div>
            )}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {showFoodDetails ? (
            <FoodDetails meal={selectedMeal} onClose={closeDetailsHandler} />
        ) : (
        <div className="grid-container">
            {searchResults.map((meal) => (
                <FoodCard key={meal.idMeal} meal={meal} onClick={() => foodCardClickHandler(meal)} />
            ))}
        </div>
        )}
    </div>
  );
};
export default SearchFood;
