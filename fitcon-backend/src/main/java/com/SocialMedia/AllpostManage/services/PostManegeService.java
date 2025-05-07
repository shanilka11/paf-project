package com.SocialMedia.AllpostManage.services;

import com.SocialMedia.AllpostManage.dtos.PostDto;
import com.SocialMedia.AllpostManage.models.PostEntity;
import com.SocialMedia.AllpostManage.repositories.PostManageRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class PostManegeService {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private PostManageRepo postManageRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ObjectMapper objectMapper;

    //save post data
    public String savePostData(PostDto postDto){
        if(postManageRepo.existsById(postDto.getPostId())){
              return "This data already have";
        }
        else {
            PostEntity data=postManageRepo.save(modelMapper.map(postDto, PostEntity.class));
            try {
                return objectMapper.writeValueAsString(data)+"Data Addedd"; // Convert object to JSON string
            } catch (Exception e) {
                e.printStackTrace();
                return "Error converting object to JSON string";
            }
        }
    }


    //delete post data
    public String deletePost(int postId) {
        if (postManageRepo.existsById(postId)) {
            postManageRepo.deleteById(postId);
            return "Data deleted successfully";
        } else {
            return "Data with ID " + postId + " not found";
        }
    }


    //update post data
    public String updatePostData(int postId, PostDto postDto) {
        Optional<PostEntity> existingPostOptional = postManageRepo.findById(postId);

        if (existingPostOptional.isPresent()) {
            PostEntity existingPost = existingPostOptional.get();

            existingPost.setDescription(postDto.getDescription());
            existingPost.setUrl(postDto.getUrl());

            // Save the updated entity to the database
            postManageRepo.save(existingPost);

            return "Data updated successfully";
        } else {
            return "Data with ID " + postId + " not found";
        }
    }



    //read data
    public List<PostDto> getallPostData(){
        List<PostEntity> Postdata=postManageRepo.findAll();
        return modelMapper.map(Postdata,new TypeToken<ArrayList<PostDto>>(){}.getType());
    }

    public List<PostEntity> findAllPostsWithUrls() {
        try {

            // Execute the query and return the result
            return entityManager.createQuery(
                    "SELECT DISTINCT p FROM PostEntity p LEFT JOIN FETCH p.url",
                    PostEntity.class
            ).getResultList();
        } catch (Exception e) {
            // Log any exceptions that occur during query execution
            System.err.println("Error occurred during findAllPostsWithUrls(): " + e.getMessage());
            e.printStackTrace(); // Print the stack trace for detailed error information
            throw e; // Re-throw the exception to propagate it to the caller
        }
    }

    //Getting post data by id
    public PostDto getPostDataById(int postId){
        Optional<PostEntity> postEntity=postManageRepo.findById(postId);
        if(postEntity.isPresent()){
            return modelMapper.map(postEntity.get(),PostDto.class);
        }
        else {
            return null;
        }
    }

}
