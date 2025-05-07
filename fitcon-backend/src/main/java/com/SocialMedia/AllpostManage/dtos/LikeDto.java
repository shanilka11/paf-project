package com.SocialMedia.AllpostManage.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class LikeDto {
    private int userId;
    private int postId;
    private boolean likeStatus;

}
