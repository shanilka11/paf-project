package com.SocialMedia.AllpostManage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.SocialMedia.AllpostManage.models.MealEntity;;;

public interface MealRepository extends JpaRepository<MealEntity, Integer>  {

    MealEntity findByName(String name);

}

