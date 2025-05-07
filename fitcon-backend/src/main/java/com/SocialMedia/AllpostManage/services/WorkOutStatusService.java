package com.SocialMedia.AllpostManage.services;

import com.SocialMedia.AllpostManage.dtos.WorkoutStatusEntityDto;
import com.SocialMedia.AllpostManage.models.PostEntity;
import com.SocialMedia.AllpostManage.models.WorkoutStatusEntity;
import com.SocialMedia.AllpostManage.repositories.WorkoutStatusRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class WorkOutStatusService {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private WorkoutStatusRepo workoutStatusRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // save workout status data
    public String saveWorkoutStatusData(WorkoutStatusEntityDto workoutStatusEntityDto) {
        if (workoutStatusRepo.existsById(workoutStatusEntityDto.getWorkoutStatusId())) {
            return "This data already exists";
        } else {
            WorkoutStatusEntity data = workoutStatusRepo
                    .save(modelMapper.map(workoutStatusEntityDto, WorkoutStatusEntity.class));
            try {
                return objectMapper.writeValueAsString(data) + "Data Added"; // Convert object to JSON string
            } catch (Exception e) {
                e.printStackTrace();
                return "Error converting object to JSON string";
            }
        }
    }

    public Map<String, Object> getWorkout(int workout_status_id) {
        try {
            String sql = "SELECT * FROM workout_status WHERE workout_status_id = ?";
            return jdbcTemplate.queryForObject(sql, new Object[]{workout_status_id}, (rs, rowNum) -> {
                Map<String, Object> map = new HashMap<>();
                map.put("workout_status_id", rs.getInt("workout_status_id"));
                map.put("weight", rs.getDouble("weight"));
                map.put("height", rs.getDouble("height"));
                map.put("age", rs.getInt("age"));
                map.put("gender", rs.getString("gender"));
                map.put("activity", rs.getString("activity"));
                map.put("calories", rs.getDouble("calories"));
                return map;
            });
        } catch (EmptyResultDataAccessException e) {
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<WorkoutStatusEntityDto> getAllWorkouts() {
        List<WorkoutStatusEntity> workoutData = workoutStatusRepo.findAll();
        if (workoutData.isEmpty()) {
            return new ArrayList<>();
        }
        return modelMapper.map(workoutData, new TypeToken<ArrayList<WorkoutStatusEntityDto>>(){}.getType());
    }



    // delete workout status data
    public String deleteWorkStatus(int workout_status_id) {
        if (workoutStatusRepo.existsById(workout_status_id)) {
            workoutStatusRepo.deleteById(workout_status_id
            );
            return "Workout status data deleted successfully";
        } else {
            return "This workout status is not in the database";
        }
    }

    public String updateWorkoutStatusData(int postId,WorkoutStatusEntityDto workoutStatusEntityDto) {
        Optional<WorkoutStatusEntity> existingPostOptional =workoutStatusRepo.findById(postId);

        if (existingPostOptional.isPresent()) {
            WorkoutStatusEntity existingPost = existingPostOptional.get();

            existingPost.setWeight(workoutStatusEntityDto.getWeight());
            existingPost.setHeight(workoutStatusEntityDto.getHeight());
            existingPost.setAge(workoutStatusEntityDto.getAge());
            existingPost.setGender(workoutStatusEntityDto.getGender());
            existingPost.setActivity(workoutStatusEntityDto.getActivity());
            existingPost.setCalories(workoutStatusEntityDto.getCalories());

            // Save the updated entity to the database
            workoutStatusRepo.save(existingPost);

            return "Data updated successfully";
        } else {
            return "Data with ID " + postId + " not found";
        }
    }


}
