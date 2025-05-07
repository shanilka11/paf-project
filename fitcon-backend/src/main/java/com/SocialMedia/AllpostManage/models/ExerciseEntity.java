package com.SocialMedia.AllpostManage.models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long eId;

    private String exerciseName;

    private Integer reps;

    private Integer sets;

    @ManyToOne
    @JoinColumn(name = "workoutType_id")
    private WorkoutTypeEntity workoutType;

    private String imageURL;
}
