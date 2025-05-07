package com.SocialMedia.AllpostManage.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutPlanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="plan_name")
    private String planName;

    @Column(name = "exercises")
    private String exercises;


    @Column(name = "notes")
    private String notes;
}
