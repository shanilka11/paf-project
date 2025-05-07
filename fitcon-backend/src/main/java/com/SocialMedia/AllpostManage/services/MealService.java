package com.SocialMedia.AllpostManage.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SocialMedia.AllpostManage.models.MealEntity;
import com.SocialMedia.AllpostManage.repositories.MealRepository;

@Service
public class MealService {

    @Autowired
    private MealRepository repository;

    public MealEntity saveMeal(MealEntity meal){
        return repository.save(meal);
    }

    public List<MealEntity> saveMeals(List<MealEntity> meals){
        return repository.saveAll(meals);
    }

    public List<MealEntity> getMeals(){
        return repository.findAll();
    }

    public MealEntity getMealById(int id){
        return repository.findById(id).orElse(null);
    }

    public MealEntity getMealByName(String name){
        return repository.findByName(name);
    }

    public String deleteMeal(int id){
        repository.deleteById(id);
        return "Meal " + id +" removed";
    }

    // public MealEntity updateMeal(MealEntity meal){
    //     MealEntity existingMeal = repository.findById(meal.getId()).orElse(meal);
    //     existingMeal.setName(meal.getName());
    //     existingMeal.setDescription(meal.getDescription());
    //     existingMeal.setCalories(meal.getCalories());
    //     existingMeal.setServings(meal.getServings());
    //     existingMeal.setRecipe(meal.getRecipe());
    //     existingMeal.setImageURL(meal.getImageURL()); // Update imageURL if needed
    //     return repository.save(existingMeal);
    // }

    public MealEntity updateMeal(int id, MealEntity updatedMeal) {
        MealEntity existingMeal = repository.findById(id).orElse(null);
        if (existingMeal != null) {
            existingMeal.setName(updatedMeal.getName());
            existingMeal.setDescription(updatedMeal.getDescription());
            existingMeal.setCalories(updatedMeal.getCalories());
            existingMeal.setServings(updatedMeal.getServings());
            existingMeal.setRecipe(updatedMeal.getRecipe());
            existingMeal.setImageURL(updatedMeal.getImageURL());
            return repository.save(existingMeal);
        } else {
            return null;
        }
    }
    
}

