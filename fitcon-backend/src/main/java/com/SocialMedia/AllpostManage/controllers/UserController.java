package com.SocialMedia.AllpostManage.controllers;

import com.SocialMedia.AllpostManage.dtos.UserDto;
import com.SocialMedia.AllpostManage.models.UserEntity;
import com.SocialMedia.AllpostManage.services.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/me")
    public UserDto createUser(@RequestBody UserEntity user){
        return userService.createUser(user);
    }
}
