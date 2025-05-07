package com.SocialMedia.AllpostManage.repositories;

import com.SocialMedia.AllpostManage.models.LikeEntity;
import com.SocialMedia.AllpostManage.models.LikeEntityId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeManegeRepo extends JpaRepository<LikeEntity, LikeEntityId>{

}
