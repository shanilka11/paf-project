// import { Box } from '@mui/material'
// import React from 'react'
// import ButtonHolder from '../Components/ButtonHolder'
// import CreateWPButton from '../Components/CreateWPButton'
// import PostCard from '../Components/PostCard'

// const WorkoutPlan = () => {
//   return (
//     <Box marginLeft="240px">
//       <Box padding="10px" width="100vw" height="100vh" display="flex" flexDirection="column">
//         <ButtonHolder />
//         <CreateWPButton />
//         <PostCard />
//       </Box>
//     </Box>
//   )
// }

// export default WorkoutPlan

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const WorkoutPlan = () => {
  const [plans, setPlans] = useState([]);
  const [planName, setPlanName] = useState('');
  const [exercises, setExercises] = useState('');
  const [notes, setNotes] = useState('');
  const [editingPlanId, setEditingPlanId] = useState(null);

  useEffect(() => {
    fetchWorkoutPlans();
  }, []);

  const fetchWorkoutPlans = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/workoutplan');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching workout plans:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/workoutplan', {
        planName,
        exercises,
        notes,
      });
      fetchWorkoutPlans();
      clearForm();
    } catch (error) {
      console.error('Error creating workout plan:', error);
    }
  };

  const handleEdit = (plan) => {
    setPlanName(plan.planName);
    setExercises(plan.exercises);
    setNotes(plan.notes);
    setEditingPlanId(plan.id);
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    const updatedPlan = {
      planName,
      exercises,
      notes,
    };

    try {
      await axios.put(`http://localhost:8080/api/workoutplan/${editingPlanId}`, updatedPlan);
      fetchWorkoutPlans();
      clearForm();
      setEditingPlanId(null);
    } catch (error) {
      console.error('Error updating workout plan:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/workoutplan/${id}`);
      fetchWorkoutPlans();
    } catch (error) {
      console.error('Error deleting workout plan:', error);
    }
  };

  const clearForm = () => {
    setPlanName('');
    setExercises('');
    setNotes('');
  };

  const handleCancelEdit = () => {
    clearForm();
    setEditingPlanId(null);
  };

  return (
    <div className="container background-image">
      <div className="row">
        <div className="col-md-6">
          <h2>{editingPlanId ? 'Edit Workout Plan' : 'Create Workout Plan'}</h2>
          <div className="workout-card">
            <div className="card-body">
              <form className="workout-plan-form" onSubmit={editingPlanId ? handleEditFormSubmit : handleCreate}>
                <div className="form-group">
                  <label>Plan Name:</label>
                  <input type="text" className="form-control" value={planName} onChange={(e) => setPlanName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Exercises:</label>
                  <textarea className="form-control" value={exercises} onChange={(e) => setExercises(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Notes:</label>
                  <textarea className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">
                  {editingPlanId ? 'Update Plan' : 'Create Plan'}
                </button>
                {editingPlanId && (
                  <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h2>Workout Plans</h2>
          <div className="card-group">
            {plans.map((plan) => (
              <div key={plan.id} className="card m-2">
                <div className="card-body">
                  <h5 className="card-title">{plan.planName}</h5>
                  <p className="card-text"><strong>Exercises:</strong> {plan.exercises}</p>
                  <p className="card-text"><strong>Notes:</strong> {plan.notes}</p>
                  <button className="btn btn-danger mr-2" onClick={() => handleDelete(plan.id)}>Delete</button>
                  <button className="btn btn-info" onClick={() => handleEdit(plan)}>Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlan;
