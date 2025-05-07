import React, { useState } from 'react';
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBAqn_Zd8L9vVriJRVkbe26PMMJHint1fU",
  authDomain: "paf-socialmedia-c2a9e.firebaseapp.com",
  projectId: "paf-socialmedia-c2a9e",
  storageBucket: "paf-socialmedia-c2a9e.appspot.com",
  messagingSenderId: "846008854427",
  appId: "1:846008854427:web:f7cfe29b05306cfb39233e",
  measurementId: "G-J9QFJ62HLN"
};

initializeApp(firebaseConfig);

function AddMeal() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    calories: '',
    servings: '',
    recipe: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload image to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + formData.image.name);
      await uploadBytes(storageRef, formData.image);

      // Once image is uploaded, get its download URL
      const imageURL = await getDownloadURL(storageRef);

      // Create meal object with image URL
      const mealData = {
        name: formData.name,
        description: formData.description,
        calories: formData.calories,
        servings: formData.servings,
        recipe: formData.recipe,
        imageURL: imageURL,
      };

      // Send meal data to backend
      await axios.post("http://localhost:9000/addMeal", mealData);

      alert("Meal added successfully!");
      // Reset form data after submission
      setFormData({
        name: '',
        description: '',
        calories: '',
        servings: '',
        recipe: '',
        image: null,
      });
    } catch (error) {
      console.log(error);
      alert("Failed to add meal. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Upload a Meal Plan</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Meal Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Calories"
                    name="calories"
                    value={formData.calories}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Servings"
                    name="servings"
                    value={formData.servings}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Recipe"
                    name="recipe"
                    value={formData.recipe}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <button className="btn btn-primary btn-block" type="submit">
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMeal;
