package com.SocialMedia.AllpostManage.dtos;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class CommentDto {

    private int userId;
    private int postId;
    private String comment;
}
