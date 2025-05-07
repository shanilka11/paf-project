package com.SocialMedia.AllpostManage.models;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode
@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class CommentEntityid implements Serializable {

    private int userId;
    private int postId;
    private String comment;
}
