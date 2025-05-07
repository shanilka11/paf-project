package com.SocialMedia.AllpostManage.repositories;

import com.SocialMedia.AllpostManage.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
}
