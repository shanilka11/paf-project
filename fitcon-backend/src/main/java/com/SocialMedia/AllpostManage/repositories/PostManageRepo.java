package com.SocialMedia.AllpostManage.repositories;

import com.SocialMedia.AllpostManage.models.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostManageRepo extends JpaRepository<PostEntity,Integer> {
}
