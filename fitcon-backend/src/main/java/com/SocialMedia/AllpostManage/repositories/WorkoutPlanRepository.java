package com.SocialMedia.AllpostManage.repositories;

import com.SocialMedia.AllpostManage.models.WorkoutPlanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlanEntity, Long> {
}
