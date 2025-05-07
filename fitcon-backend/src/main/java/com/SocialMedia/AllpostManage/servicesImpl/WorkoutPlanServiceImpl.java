package com.SocialMedia.AllpostManage.servicesImpl;

import com.SocialMedia.AllpostManage.models.WorkoutPlanEntity;
import com.SocialMedia.AllpostManage.repositories.WorkoutPlanRepository;
import com.SocialMedia.AllpostManage.services.WorkoutPlanService;
import com.SocialMedia.AllpostManage.exception.WorkoutPlanNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutPlanServiceImpl implements WorkoutPlanService {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;


    @Override
    public WorkoutPlanEntity saveWorkoutPlanModel(WorkoutPlanEntity workoutplan) {
        return workoutPlanRepository.save(workoutplan);
    }

    @Override
    public List<WorkoutPlanEntity> getAllworkoutplans() {
        return workoutPlanRepository.findAll();
    }

    @Override
    public WorkoutPlanEntity getWorkoutPlanById(Long workoutplanId) {
        return workoutPlanRepository.findById(workoutplanId).orElseThrow(()->
                new WorkoutPlanNotFoundException("WorkoutPlanModel","Id",workoutplanId));
    }

    @Override
    public WorkoutPlanEntity updateWorkoutPlan(WorkoutPlanEntity workoutPlan, Long id) {
        WorkoutPlanEntity existingWorkoutPlanModel = workoutPlanRepository.findById(id).orElseThrow(
                ()-> new WorkoutPlanNotFoundException("WorkoutPlanModel", "Id", id)
        );


        existingWorkoutPlanModel.setPlanName(workoutPlan.getPlanName());
        existingWorkoutPlanModel.setExercises(workoutPlan.getExercises());
        existingWorkoutPlanModel.setNotes(workoutPlan.getNotes());

        //save to DB
        workoutPlanRepository.save(existingWorkoutPlanModel);

        return existingWorkoutPlanModel;
    }

    @Override
    public void deleteWorkoutPlan(Long id) {

        //check whether a workoutplan exist in DB or not
        workoutPlanRepository.findById(id).orElseThrow(()->
                new WorkoutPlanNotFoundException("WorkoutPlanModel", "Id", id));

        workoutPlanRepository.deleteById(id);
    }


}
