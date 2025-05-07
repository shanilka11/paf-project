package com.SocialMedia.AllpostManage.services;

import com.SocialMedia.AllpostManage.models.WorkoutPlanEntity;

import java.util.List;

public interface WorkoutPlanService {
    WorkoutPlanEntity saveWorkoutPlanModel(WorkoutPlanEntity workoutplan);

    List<WorkoutPlanEntity> getAllworkoutplans();

    WorkoutPlanEntity getWorkoutPlanById(Long workoutplanId);

    WorkoutPlanEntity updateWorkoutPlan(WorkoutPlanEntity workoutPlan, Long id);

    void deleteWorkoutPlan(Long id);
}
