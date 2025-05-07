import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditMeal() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    calories: '',
    servings: '',
    recipe: '',
    image: null,
  });

  useEffect(() => {
    fetchMealData();
  }, []);

  const fetchMealData = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/mealById/${id}`);
      const mealData = response.data;
      setFormData({
        name: mealData.name,
        description: mealData.description,
        calories: mealData.calories,
        servings: mealData.servings,
        recipe: mealData.recipe,
        image: mealData.imageURL, // You may need to handle image separately if you want to display it for editing
      });
    } catch (error) {
      console.error('Error fetching meal data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/update/${id}`, formData);
      alert("Meal updated successfully!");
      // Redirect or do something else after successful update
    } catch (error) {
      console.error('Error updating meal:', error);
      alert("Failed to update meal. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Edit Meal</h2>
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
                {/* Input field for image editing */}
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleChange} // Handle image changes separately
                  />
                </div>
                <button className="btn btn-primary btn-block" type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMeal;
