package com.SocialMedia.AllpostManage.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String userName;
    private String fname;
    private String lname;
    private String password;
    private String primaryEmail;
    private String backupEmail;
//    private List<UserEntity> followers;
//    private List<UserEntity> following;
    private String imageURL;

    private LocalDateTime createdAt;

}
