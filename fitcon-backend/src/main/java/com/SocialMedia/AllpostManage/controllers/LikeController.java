package com.SocialMedia.AllpostManage.controllers;

import com.SocialMedia.AllpostManage.dtos.LikeDto;
import com.SocialMedia.AllpostManage.services.LikeManegeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/like")
public class LikeController {

    @Autowired
    private LikeManegeService likeManegeService;
    @PostMapping(value = "/add")
    public ResponseEntity<String> AddLike(@RequestBody LikeDto likeDto){
        try {
            String res= likeManegeService.AddLike(likeDto);
            return ResponseEntity.status(HttpStatus.OK).body(String.valueOf(res));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data not added"+ e.getMessage());
        }
    }

    @GetMapping(value = "/CountLike/{id}")
    public ResponseEntity<String> CountLike(@PathVariable int id){
        try {
            String res= String.valueOf(likeManegeService.GetLikeCount(id));
            return ResponseEntity.status(HttpStatus.OK).body(String.valueOf(res));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data not added"+ e.getMessage());
        }
    }

    @GetMapping(value = "/CheckLike/{postId}/{userId}")
    public ResponseEntity<String> CheckLike(@PathVariable int userId,@PathVariable int postId){
        try {
            String res= String.valueOf(likeManegeService.CheackLikeStatus(userId,postId));
            return ResponseEntity.status(HttpStatus.OK).body(String.valueOf(res));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data not added"+ e.getMessage());
        }
    }

    //get like data by userid
    @GetMapping(value = "/getLikeData/{userId}")
    public ResponseEntity<Object> getLikeData(@PathVariable int userId){
        try {
            Object res= likeManegeService.getLikeData(userId);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data not database"+ e.getMessage());
        }
    }

    //Update like
    @PutMapping(value = "/update/{pid}/{uid}")
    public ResponseEntity<String> UpdateLike(@PathVariable int uid,@PathVariable int pid){
        try {
            String res= likeManegeService.UpdateLike(uid,pid);
            return ResponseEntity.status(HttpStatus.OK).body(String.valueOf(res));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data not added"+ e.getMessage());
        }
    }



}
