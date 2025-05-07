package com.SocialMedia.AllpostManage.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date; // Import Date class
import jakarta.persistence.PrePersist; // Import PrePersist annotation

import java.util.Date; // Import Date class
import jakarta.persistence.PrePersist; // Import PrePersist annotation

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "MEAL_TABLE")
public class MealEntity {

    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String description;
    private int calories;
    private int servings;
    private String recipe;
    private String imageURL; // New field for storing image URL
    private Date date; // New field for storing post date

    @PrePersist // Annotation to invoke this method before persisting the entity
    protected void onCreate() {
        // Set the current date when a new entity is persisted
        this.date = new Date();
    }
}
