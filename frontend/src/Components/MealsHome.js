import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MealCard from './MealCard'; // Import your MealCard component
import { Link } from 'react-router-dom';
import { Margin } from '@mui/icons-material';

function MealsHome() {
  const [meals, setMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get("http://localhost:9000/meals");
        setMeals(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMeals();
  }, []);

  const handleMealSelection = (mealId) => {
    // Toggle selection
    setSelectedMeals((prevSelectedMeals) =>
      prevSelectedMeals.includes(mealId)
        ? prevSelectedMeals.filter((id) => id !== mealId)
        : [...prevSelectedMeals, mealId]
    );
  };

  return (
    <div style={{justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {meals.map((meal) => (
        <div className='mb-3' key={meal.id}>
          <MealCard
            meal={meal}
            isSelected={selectedMeals.includes(meal.id)}
            onSelect={() => handleMealSelection(meal.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default MealsHome;
