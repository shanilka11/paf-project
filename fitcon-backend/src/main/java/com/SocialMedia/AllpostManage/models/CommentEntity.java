package com.SocialMedia.AllpostManage.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CommentData")
@IdClass(CommentEntityid.class)
public class CommentEntity {

    @Id
    private int userId;

    @Id
    private int postId;

    @Id
    private String comment;
}
