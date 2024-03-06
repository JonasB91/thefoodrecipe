import React from 'react'
import '../css/SearchFood.css';


const FoodCard = ( { meal, onClick }) => {

  const handleClick = () => {
    onClick(meal);
  };


  return (
    <div className="food-card" onClick={handleClick}>
        <h3>{meal.strMeal}</h3>
        <img src={meal.strMealThumb} alt={meal.strMeal} />
    </div>
  )
}

export default FoodCard;
