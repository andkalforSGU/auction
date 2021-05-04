package com.example.auction.DTO;

import lombok.Data;

@Data
public class UserDTO {
    private int id;
    private String login;
    private String password;
    private boolean is_adm;
}
