import React from 'react'

function FoodDetails( { meal, onClose } ) {
  return (
    <div className="food-details">
        <button onClick={onClose}>Close</button>
        <h3>{meal.strArea}</h3>
        <p>Category: {meal.strCategory}</p>
        <p>Area: {meal.strArea}</p>
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <p>{meal.strInstructions}</p>
    </div>
  );
};

export default FoodDetails;
