package com.example.auction.DTO;

import lombok.Data;

@Data
public class LotDTO {
    private int id;
    private String name;
    private String description;
    private int user_id;
}
