package com.SocialMedia.AllpostManage.controllers;

import com.SocialMedia.AllpostManage.dtos.PostDto;
import com.SocialMedia.AllpostManage.models.PostEntity;
import com.SocialMedia.AllpostManage.services.PostManegeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
public class
PostController {

    @Autowired
    private PostManegeService postManegeService;

    @PostMapping(value ="/add")
    public ResponseEntity<String> savepostData(@RequestBody PostDto postDto){
       try {
           String res= (String) postManegeService.savePostData(postDto);
           return ResponseEntity.status(HttpStatus.OK).body(res);
       }catch (Exception e){
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data not added"+e.getMessage());
       }
    }

  @GetMapping(value = "/all")
    public ResponseEntity<Object> getData(){
        try {
            List<PostDto>PostAllData=postManegeService.getallPostData();
            return new ResponseEntity<Object>(PostAllData, HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

  }


  //update data
  @PutMapping(value = "/update/{id}")
    public ResponseEntity<String> UpdatAllData(@RequestBody PostDto postDto,@PathVariable int id){

        try {
            String respo=postManegeService.updatePostData(id, postDto);
            return ResponseEntity.status(HttpStatus.OK).body("update success");

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Not update data");
        }
  }

  @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity Deletedata(@PathVariable int id){

        try {
            String deletePost=postManegeService.deletePost(id);
            return new ResponseEntity<Object>(deletePost,HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

  }

  @GetMapping(value = "getAll")
    public ResponseEntity<Object> getallData(){
        try {
            List<PostEntity> PostAllData=postManegeService.findAllPostsWithUrls();
            return new ResponseEntity<Object>(PostAllData, HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("err");
        }
  }

  //get data by id
  @GetMapping(value = "/get/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<PostDto> getPostById(@PathVariable int id) {
      try {
          PostDto postDto = postManegeService.getPostDataById(id);
          return ResponseEntity.ok(postDto);
      } catch (Exception e) {
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
      }
  }

}

