package com.SocialMedia.AllpostManage.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "LikeData")
@IdClass(LikeEntityId.class)
public class LikeEntity implements Serializable {

    @Id
    private int userId;
    @Id
    private int postId;
    private boolean likeStatus;

}
