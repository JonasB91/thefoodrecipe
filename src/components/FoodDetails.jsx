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
          <div>
          <p className="category">Food Category - {mealDetails.strCategory}</p>
          </div>
          <div className="country-container">
          <p className="area">Country - {mealDetails.strArea}</p>
          </div>
          <h3 className="instruction-title">How to make this meal - Instructions below!</h3>
          <div className="instructions-container">
          <p> <br /> {mealDetails.strInstructions}</p>
          </div>
          <h4 className="ingredient-title">Ingredients:</h4>
          <div className="ingredient-container">
          <ul>
            {Object.keys(mealDetails)
              .filter(key => key.startsWith('strIngredient') && mealDetails[key])
              .map(key => (
                <li key={key}>{mealDetails[key]} - {mealDetails[`strMeasure${key.slice(-1)}`]}</li>
              ))}
          </ul>
          </div>
          </>
        )}
    </div>
  );
};

export default FoodDetails;
