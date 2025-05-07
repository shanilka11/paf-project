import React, { createContext, useState, useContext } from 'react';

const CalorieContext = createContext();

export const useCalorie = () => useContext(CalorieContext);

export const CalorieProvider = ({ children }) => {
  const [calories, setCalories] = useState(0);
  const [completedCalories, setCompletedCalories] = useState(0); // Example static value

  const updateCalories = (newCalories) => {
    setCalories(newCalories);
    // Here you can also calculate completed calories based on new data, if applicable
  };

  return (
    <CalorieContext.Provider value={{ calories, completedCalories, updateCalories }}>
      {children}
    </CalorieContext.Provider>
  );
};
