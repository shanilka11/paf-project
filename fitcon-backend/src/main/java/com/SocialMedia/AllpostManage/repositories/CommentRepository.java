package com.SocialMedia.AllpostManage.repositories;

import com.SocialMedia.AllpostManage.models.CommentEntity;
import com.SocialMedia.AllpostManage.models.CommentEntityid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<CommentEntity, CommentEntityid>{

}
