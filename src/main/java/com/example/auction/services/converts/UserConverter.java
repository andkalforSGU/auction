package com.example.auction.services.converts;

import com.example.auction.DTO.UserDTO;
import com.example.auction.entities.User;
import com.example.auction.services.validations.UserVal;
import org.springframework.stereotype.Component;

import javax.xml.bind.ValidationException;

@Component
public class UserConverter {

    public User UserDTOToUser (UserDTO userDTO) throws ValidationException {
        UserVal userVal = new UserVal();

        if (userVal.valUserDTO(userDTO)) {
            User user = new User();
            user.setId(userDTO.getId());
            user.setLogin(userDTO.getLogin());
            user.setPassword(userDTO.getPassword());

            return user;
        }

        return null;
    }

    public UserDTO UserToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setLogin(user.getLogin());
        userDTO.setPassword(user.getPassword());

        return userDTO;
    }
}
