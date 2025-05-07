package com.SocialMedia.AllpostManage.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "PostData")
public class PostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postId;

    @ElementCollection
    @CollectionTable(name = "PostUrls", joinColumns = @JoinColumn(name = "postId")) // Specify the collection table and its relationship to the main entity
    @Column(name = "url") // Specify the column name for the URLs
    private List<String> url;
    private LocalDateTime date;
    private String description;

    @PrePersist
    protected void onCreate() {
        date = LocalDateTime.now();
    }
}