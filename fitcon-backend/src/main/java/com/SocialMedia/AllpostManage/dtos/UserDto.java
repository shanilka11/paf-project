package com.SocialMedia.AllpostManage.dtos;


import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class UserDto {
    private Long userId;
    private String userName;
    private LocalDateTime createdAt;
}
