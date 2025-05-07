package com.SocialMedia.AllpostManage.services;

import com.SocialMedia.AllpostManage.dtos.UserDto;
import com.SocialMedia.AllpostManage.models.UserEntity;
import org.apache.catalina.User;

public interface UserService {

   public UserDto createUser(UserEntity user);
}
