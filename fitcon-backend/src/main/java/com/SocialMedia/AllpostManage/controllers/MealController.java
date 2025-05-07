package com.SocialMedia.AllpostManage.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.SocialMedia.AllpostManage.models.MealEntity;
import com.SocialMedia.AllpostManage.services.MealService;

@RestController
public class MealController {
    
    @Autowired
    private MealService service;

    @PostMapping("/addMeal")
    public MealEntity addMeal(@RequestBody MealEntity meal){
        return service.saveMeal(meal);
    }

    @PostMapping("/addMeals")
    public List<MealEntity> addMeals(@RequestBody List<MealEntity> meals){
        return service.saveMeals(meals);
    }

    @GetMapping("/meals")
    public List<MealEntity> findAllMeals(){
        return service.getMeals();
    }

    @GetMapping("/mealById/{id}")
    public MealEntity findMealById(@PathVariable int id){
        return service.getMealById(id);
    }

    @GetMapping("/meal/{name}")
    public MealEntity findMealByName(@PathVariable String name){
        return service.getMealByName(name);
    }

    // @PutMapping("/update")
    // public MealEntity updateMeal(@RequestBody MealEntity meal){
    //     return service.updateMeal(meal);
    // }

    @DeleteMapping("delete/{id}")
    public String deleteMeal(@PathVariable int id){
        return service.deleteMeal(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateMeal(@PathVariable int id, @RequestBody MealEntity updatedMeal) {
    MealEntity updatedEntity = service.updateMeal(id, updatedMeal);
    if (updatedEntity != null) {
        return ResponseEntity.ok(updatedEntity);
    } else {
        return ResponseEntity.notFound().build();
    }
}



}

