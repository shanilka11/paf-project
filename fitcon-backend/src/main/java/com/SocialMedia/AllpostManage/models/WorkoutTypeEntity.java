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
public class WorkoutTypeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long wTypeId;

    private String name;

    private String intensity;

    @ManyToOne
    @JoinColumn(name = "workoutPlan_id")
    private WorkoutPlanEntity workoutPlan;

    @OneToMany(mappedBy = "workoutType")
    private List<ExerciseEntity> exercises;
}
