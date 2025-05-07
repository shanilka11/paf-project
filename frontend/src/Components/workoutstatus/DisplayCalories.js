import React from 'react';

function DisplayWorkoutStatus({ woStatusId, weight, height, age, gender, activity, calories }) {
  return (
    <div>
      <h1>Workout Status Details</h1>
      <p>Workout Status ID: {woStatusId}</p>
      <p>Weight: {weight} kg</p>
      <p>Height: {height} cm</p>
      <p>Age: {age} years</p>
      <p>Gender: {gender}</p>
      <p>Activity Level: {activity}</p>
      <p>Calories Calculated: {calories}</p>
    </div>
  );
}

export default DisplayWorkoutStatus;
