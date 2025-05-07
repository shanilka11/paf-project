package com.SocialMedia.AllpostManage.controllers;


import com.SocialMedia.AllpostManage.models.WorkoutPlanEntity;
import com.SocialMedia.AllpostManage.services.WorkoutPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workoutplan")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanService workoutPlanService;

    @PostMapping
    public ResponseEntity<WorkoutPlanEntity> saveWorkoutPlanModel(@RequestBody WorkoutPlanEntity workoutplan){
        return new ResponseEntity<WorkoutPlanEntity>(workoutPlanService.saveWorkoutPlanModel(workoutplan), HttpStatus.CREATED);
    }

    @GetMapping
    public List<WorkoutPlanEntity> getAllworkoutplans(){
        return workoutPlanService.getAllworkoutplans();
    }

    @GetMapping("{id}")
    public ResponseEntity<WorkoutPlanEntity> getWorkoutPlanById(@PathVariable("id") Long workoutplanId){
        return new ResponseEntity<WorkoutPlanEntity>(workoutPlanService.getWorkoutPlanById(workoutplanId), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<WorkoutPlanEntity> updateWorkoutPlanModel(@PathVariable("id") Long id,@RequestBody WorkoutPlanEntity workoutPlan){

        return new ResponseEntity<WorkoutPlanEntity>(workoutPlanService.updateWorkoutPlan(workoutPlan, id), HttpStatus.OK);

    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteWorkoutPlan(@PathVariable("id")Long id){

        //delete workout plan
        workoutPlanService.deleteWorkoutPlan(id);

        return new ResponseEntity<String>("Workoutplan delete successfully!", HttpStatus.OK);

    }
}
