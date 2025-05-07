package com.SocialMedia.AllpostManage.controllers;

import com.SocialMedia.AllpostManage.dtos.WorkoutStatusEntityDto;
import com.SocialMedia.AllpostManage.services.WorkOutStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/workout")
public class WorkoutStatusController {

    @Autowired
    private WorkOutStatusService workOutStatusService;

    @PostMapping(value = "/add")
    public ResponseEntity<String> AddWorkout(@RequestBody WorkoutStatusEntityDto workoutStatusEntityDto) {
        try {
            String res = workOutStatusService.saveWorkoutStatusData(workoutStatusEntityDto);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Workout data not added: " + e.getMessage());
        }
    }

    @GetMapping(value = "/workout/{id}")
    public ResponseEntity<Object> getWorkoutById(@PathVariable int id) {
        try {
            Map<String, Object> workout = workOutStatusService.getWorkout(id);
            if (workout == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Workout not found");
            }
            return ResponseEntity.ok().body(workout);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }


    @GetMapping(value = "/workouts")
    public ResponseEntity<Object> getAllWorkouts() {
        try {
            List<WorkoutStatusEntityDto> workouts = workOutStatusService.getAllWorkouts();
            if (workouts.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No workout data available");
            }
            return ResponseEntity.ok().body(workouts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving workouts: " + e.getMessage());
        }
    }



    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteWorkout(@PathVariable String id){
        try {
            int workoutId = Integer.parseInt(id);
            String res = workOutStatusService.deleteWorkStatus(workoutId);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid ID format");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Workout data not deleted: " + e.getMessage());
        }
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<String> updateWorkout(@PathVariable int id, @RequestBody WorkoutStatusEntityDto workoutStatusEntityDto) {
        try {
            String res = workOutStatusService.updateWorkoutStatusData(id, workoutStatusEntityDto);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Workout data not updated: " + e.getMessage());
        }
    }


}
