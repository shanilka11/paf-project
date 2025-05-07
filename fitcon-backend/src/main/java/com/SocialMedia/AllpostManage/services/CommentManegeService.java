package com.SocialMedia.AllpostManage.services;
import com.SocialMedia.AllpostManage.dtos.CommentDto;
import com.SocialMedia.AllpostManage.models.CommentEntity;
import com.SocialMedia.AllpostManage.repositories.CommentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentManegeService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private JdbcTemplate jdbcTemplate;


    public String AddComment(CommentDto commentDto) {

        try {
            commentRepository.save(modelMapper.map(commentDto, CommentEntity.class));
            return "Comment Added";
        }catch(Exception e){
            return "Comment added Error";
        }

    }


    public List<String> getComments(long postId) {
        try {
            String sql = "SELECT comment FROM comment_data WHERE post_id = ?";
            List<String> comments = jdbcTemplate.queryForList(sql, new Object[]{postId}, String.class);

            if (comments.isEmpty()) {
                // Return an empty list if there are no comments
                return new ArrayList<>();
            } else {
                // Return the list of comments
                return comments;
            }
        } catch (Exception e) {
            e.printStackTrace();
            // Handle the exception accordingly, you can also throw it if needed
            return new ArrayList<>();
        }
    }


}
