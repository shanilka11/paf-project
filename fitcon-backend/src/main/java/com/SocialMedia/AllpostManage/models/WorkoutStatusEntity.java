package com.SocialMedia.AllpostManage.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "WorkoutStatus")
public class WorkoutStatusEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int workoutStatusId;
    private String weight;
    private String height;
    private int age;
    private String gender;
    private String activity;
    private String calories;

}
