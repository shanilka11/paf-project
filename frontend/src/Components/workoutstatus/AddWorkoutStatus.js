import React, { useState } from 'react';
import axios from 'axios';

function AddWorkoutStatus() {
  // State hooks for managing form inputs
  const [woStatusId, setWoStatusId] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState('');
  const [calories, setCalories] = useState(0);  // Directly manage calories state in the component

  // Function to calculate calories based on user input
  const calculateCalories = () => {
    let bmr = 0;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * parseFloat(weight)) + (4.799 * parseFloat(height)) - (5.677 * parseFloat(age));
    } else if (gender === 'female') {
      bmr = 447.593 + (9.247 * parseFloat(weight)) + (3.098 * parseFloat(height)) - (4.330 * parseFloat(age));
    }

    switch(activity) {
      case 'sedentary': return bmr * 1.2;
      case 'lightly active': return bmr * 1.375;
      case 'moderately active': return bmr * 1.55;
      case 'very active': return bmr * 1.725;
      case 'super active': return bmr * 1.9;
      default: return bmr; // Minimal activity level by default
    }
  };

  // Function to reset form fields
  const handleReset = () => {
    setWoStatusId('');
    setWeight('');
    setHeight('');
    setAge('');
    setGender('');
    setActivity('');
    setCalories(0); // Reset calories directly in the component
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const calculatedCalories = calculateCalories();
    setCalories(calculatedCalories);

    const allData = { woStatusId, weight, height, age, gender, activity, calories: calculatedCalories };

    axios.post("http://localhost:9000/workout/add", allData)
      .then(res => {
        console.log('Data Added:', res.data);
        handleReset();
      }).catch(err => {
        console.log(err.message);
      })
  }

  // JSX for rendering the form
  return (
    <div className="container">
      <div className='container2' style={{ marginTop: '100px', border: '2px solid #ccc', borderRadius: '10px', padding: '20px', }}>
        <form onSubmit={handleSubmit}>
            <h2 className='row justify-content-center'>Add New Workout Status</h2>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="mb-3">
                        <label htmlFor="weight" className="form-label">Weight</label>
                        <input type="text" className="form-control" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="height" className="form-label">Height</label>
                        <input type="text" className="form-control" id="height" value={height} onChange={(e) => setHeight(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="text" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <input type="text" className="form-control" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="activity" className="form-label">Activity</label>
                        <input type="text" className="form-control" id="activity" value={activity} onChange={(e) => setActivity(e.target.value)} required/>
                    </div>
                </div>
                <div className="col-md-4">
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                    <button type="submit" className="btn btn-primary" style={{ marginRight: '10px', width: '80px', height: '30px', padding: '5px 10px', fontSize: '12px' }}>
                        SUBMIT
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ marginRight: '10px', width: '80px', height: '30px', padding: '5px 10px', fontSize: '12px' }}>
                        RESET
                    </button>
                </div>
                </div>
            </div>
        </form>
      </div>
    </div>
  );
}

export default AddWorkoutStatus;
