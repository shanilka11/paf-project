import React from "react";
import AddPosts from "./Components/HomePage";
import AddPhotosVideos from "./Components/AddPhotosVideos";
import MealsHome from "./Components/MealsHome";
import ShowPostsPicturesAndVideos from "./Components/ShowPostsPicturesAndVideos";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddMeal from "./Components/AddMeal";
import WorkoutPlan from "./pages/WorkoutPlan";
import EditMeal from "./Components/EditMeal";
import UpdatePost from "./Components/UpdatePostData";
import AddWorkoutStatus from "./Components/workoutstatus/AddWorkoutStatus";
import ViewWorkoutStatus from "./Components/workoutstatus/ViewWorkoutStatus";


function App() {
  return (
    <div className="App">
        <Router>
          <Routes>            
            <Route path="/" element={<AddPosts />} />
            <Route path="/addpost" element={<AddPhotosVideos/>} />
            <Route path="/pv" element={<ShowPostsPicturesAndVideos/>} />
            <Route path="/meals" element={<MealsHome/>} />
            <Route path="/addMeal" element={<AddMeal/>} />
            <Route path="/workoutplan" element={<WorkoutPlan/>} /> 
            <Route path="/meal/update/:id" element={<EditMeal/>} />
            <Route path="/updatepost/:id" element={<UpdatePost/>} />
            <Route path="/addworkoutstatus" element={<AddWorkoutStatus />} />
            <Route path="/viewworkoutstatus" element={<ViewWorkoutStatus />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
