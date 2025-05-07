import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowPostsPicturesAndVideos from './ShowPostsPicturesAndVideos';
import ViewWorkoutStatus from './workoutstatus/ViewWorkoutStatus';
import MealsHome from './MealsHome';

function AddPosts() {
  const [postData, setPostData] = useState([]);
  const [mealData, setMealData] = useState([]);
  const [workoutStatusData, setWorkoutStatusData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await axios.get("http://localhost:9000/post/getAll");
        setPostData(postResponse.data);

        const mealResponse = await axios.get("http://localhost:9000/meals");
        setMealData(mealResponse.data);

        const workoutStatusResponse = await axios.get('http://localhost:9000/workout/workouts');
        setWorkoutStatusData(workoutStatusResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const combined = [];

    postData.forEach(post => combined.push({ type: 'post', data: post }));
    mealData.forEach(meal => combined.push({ type: 'meal', data: meal }));
    workoutStatusData.forEach(status => combined.push({ type: 'workoutStatus', data: status }));

    setCombinedData(combined);
  }, [postData, mealData, workoutStatusData]);

  return (
    <div>
      <br />
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <a href='/' style={{textDecoration:'none', color:'black'}}><h2>FitCon</h2></a>
            <div style={{display:'flex',marginRight:'25%'}}> {/* Apply text-center class here */}
              <a href='/addpost'><Button variant="dark" >Add Photos/Videos +</Button></a>
              <a href='/addworkoutstatus'><Button variant="dark" style={{marginLeft:'10px'}}>WorkOut Status +</Button></a>
              <a href='#'><Button variant="dark" style={{marginLeft:'10px'}}>WorkOut Plan +</Button></a>
              <a href='/addMeal'><Button variant="dark" style={{marginLeft:'10px'}}>Meal Plan +</Button></a>
            </div>
        </Container>
      </Navbar> 

      {/* Render combined data */}
      <Container className='container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {combinedData.map((item, index) => (
          <div key={index}>
            {item.type === 'post' && <ShowPostsPicturesAndVideos data={item.data} />}
            {item.type === 'meal' && <MealsHome data={item.data} />}
            {item.type === 'workoutStatus' && <ViewWorkoutStatus data={item.data} />}
          </div>
        ))}
      </Container>
    </div>
  );
}

export default AddPosts;
