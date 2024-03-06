import React, {useState, useEffect } from 'react'
import '../css/FoodDetails.css'


function FoodDetails( { meal, onClose } ) {
  const [mealDetails, setMealDetails] = useState(null); // useState Hook vi hanterar mealdetails 
  
  //fetchar vi api'n igen för att hämta detaljer till varje dish som ska displayas separat
  useEffect(() => {
    const fetchMealDetails = () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
        .then(response => response.json())
        .then(data => setMealDetails(data.meals[0]))
        .catch(error => console.error('Error fetching meal details!!!'))
    };
    

    fetchMealDetails();

    //Cleanup function för att avbryta fetch request om komponenten inte mountas
    return () => {
      //vi avbryter pågående fetch request eller cleanup här
    };
  }, [meal]);


  return (
    <div className="food-details">
        <div className="btn-container">
        <button className="close-btn" onClick={onClose}>Close</button>
        </div>
        <div className="food-title">
        <h3>{meal.strMeal}</h3>
        </div>
        <div className="card-container">
          <div className="card">
          <img className="meal-image" src={meal.strMealThumb} alt={meal.strMeal} />
          </div>
        </div>
        {mealDetails && (
          <>
          <p className="category">Category: {mealDetails.strCategory}</p>
          <p className="area">Area: {mealDetails.strArea}</p>
          <p className="instructions">Instructions: {mealDetails.strInstructions}</p>
          <h4>Ingredients:</h4>
          <ul>
            {Object.keys(mealDetails)
              .filter(key => key.startsWith('strIngredient') && mealDetails[key])
              .map(key => (
                <li key={key}>{mealDetails[key]} - {mealDetails[`strMeasure${key.slice(-1)}`]}</li>
              ))}
          </ul>
          </>
        )}
    </div>
  );
};

export default FoodDetails;
