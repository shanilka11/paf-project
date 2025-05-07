package com.SocialMedia.AllpostManage.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutStatusEntityDto {
    private int workoutStatusId;
    private String weight;
    private String height;
    private int age;
    private String gender;
    private String activity;
    private String calories;
}
