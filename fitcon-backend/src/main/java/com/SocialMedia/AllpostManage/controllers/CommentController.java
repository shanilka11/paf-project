package com.SocialMedia.AllpostManage.controllers;

import com.SocialMedia.AllpostManage.dtos.CommentDto;
import com.SocialMedia.AllpostManage.services.CommentManegeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentManegeService commentManegeService;

    @PostMapping(value = "/add")
    public ResponseEntity<String> AddLike(@RequestBody CommentDto commentDto){
        try {
            String res= commentManegeService.AddComment(commentDto);
            return ResponseEntity.status(HttpStatus.OK).body(String.valueOf(res));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Comment Data Not Added"+ e.getMessage());
        }
    }


    @GetMapping(value = "/allcomment/{id}")
    public ResponseEntity<Object> allComments(@PathVariable int id) {
        try {
            List<String> comments = commentManegeService.getComments(id);
            return ResponseEntity.ok().body(comments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



}
