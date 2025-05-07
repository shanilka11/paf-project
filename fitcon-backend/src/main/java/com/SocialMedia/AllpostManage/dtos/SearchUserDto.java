package com.SocialMedia.AllpostManage.dtos;

import com.SocialMedia.AllpostManage.models.UserEntity;
import lombok.Data;

import java.util.List;


@Data
public class SearchUserDto {

    private String userName;
    private String fname;
    private String lname;
    private List<UserEntity> followers;
    private List<UserEntity> following;
}
