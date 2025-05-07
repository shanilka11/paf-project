package com.SocialMedia.AllpostManage.services;

import com.SocialMedia.AllpostManage.dtos.LikeDto;
import com.SocialMedia.AllpostManage.models.LikeEntity;
import com.SocialMedia.AllpostManage.repositories.LikeManegeRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.dao.EmptyResultDataAccessException;

import javax.management.StringValueExp;

@Service
public class LikeManegeService {

    @Autowired
    private LikeManegeRepo likeManegeRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String AddLike(LikeDto likeDto) {

       try {
           likeManegeRepo.save(modelMapper.map(likeDto,LikeEntity.class ));
              return "Like Added";
       }catch(Exception e){
           return "Error add like";
       }

    }


    public String RemoveLike(LikeDto likeDto) {

       try {
           likeManegeRepo.delete(modelMapper.map(likeDto,LikeEntity.class ));
              return "Like Removed";
       }catch(Exception e){
           return "Error remove like";
       }

    }



    public String UpdateLike(int user_id,int post_id) {
        try {
            String sql = "UPDATE like_data SET like_status = false  WHERE post_id = ? AND user_id = ?";
            jdbcTemplate.update(sql, post_id, user_id);
            return "Like status updated successfully";
        } catch (DataAccessException e) {
            e.printStackTrace();
            return "Like status update error: " + e.getMessage();
        }

    }


    public String GetLikeCount(long postId) {
        try {
            String sql = "SELECT COUNT(like_status) FROM like_data WHERE post_id = ?";
            String value = String.valueOf(jdbcTemplate.queryForObject(sql, new Object[]{postId}, Integer.class));
            if (Integer.parseInt(value)==0) {
                return "No data";
            } else {
                return value;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Like count error1"+e.getMessage();
        }
    }




    public String CheackLikeStatus(long postId, long userId) {
        try {
            String sql = "SELECT like_status FROM like_data WHERE post_id = ? AND user_id = ?";
            Boolean likeStatus = jdbcTemplate.queryForObject(sql, new Object[]{postId, userId}, Boolean.class);
            return likeStatus != null ? likeStatus.toString() : "User not like";
        } catch (EmptyResultDataAccessException e) {
            return "No like status found for the specified post and user.";
        } catch (DataAccessException e) {
            e.printStackTrace();
            return "Like status check error: " + e.getMessage();
        }
    }

    public Object getLikeData(long userId) {
        try {
            String sql = "SELECT like_status,post_id,user_id FROM like_data WHERE user_id = ?";
            return jdbcTemplate.queryForList(sql, userId);
        } catch (DataAccessException e) {
            e.printStackTrace();
            return "Error getting like data: " + e.getMessage();
        }
    }


}
