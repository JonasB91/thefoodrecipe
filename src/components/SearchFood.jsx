import React, { useState } from 'react';
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

    // eventhandler för att söka
    const handleSearchChange = (event) => {
        setSearchFood(event.target.value);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchFood}`);
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
                <input className="input-field" type="text" value={searchFood} onChange={handleSearchChange} />
                <button className="search-btn" type="submit">Search</button>
            </form>
        </div>
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
