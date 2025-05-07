package com.SocialMedia.AllpostManage.dtos;

import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class PostDto {
    private int postId;
    private List<String> url; // Change the type to List<String>
    private LocalDateTime date;
    private String description;

    @PrePersist
    protected void onCreate() {
        date = LocalDateTime.now();
    }
}
