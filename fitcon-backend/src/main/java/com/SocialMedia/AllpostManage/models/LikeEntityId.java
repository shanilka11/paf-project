package com.SocialMedia.AllpostManage.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@EqualsAndHashCode
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LikeEntityId implements Serializable {
    private int userId;
    private int postId;
}
