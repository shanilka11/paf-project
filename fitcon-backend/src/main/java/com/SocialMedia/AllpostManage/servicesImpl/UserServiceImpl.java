package com.SocialMedia.AllpostManage.servicesImpl;

import com.SocialMedia.AllpostManage.dtos.UserDto;
import com.SocialMedia.AllpostManage.models.UserEntity;
import com.SocialMedia.AllpostManage.repositories.UserRepository;
import com.SocialMedia.AllpostManage.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    ModelMapper modelMapper;


    @Override
    public UserDto createUser(UserEntity user) {
        UserEntity userEntity = userRepository.save(user);
        return convertUserEntityToDto(userEntity);
    }

    private UserDto convertUserEntityToDto(UserEntity user){
        UserDto userDto = new UserDto();
        userDto = modelMapper.map(user, UserDto.class);
        return userDto;
    }
}
