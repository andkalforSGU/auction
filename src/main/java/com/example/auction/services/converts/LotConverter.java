package com.example.auction.services.converts;

import com.example.auction.DTO.LotDTO;
import com.example.auction.entities.Lot;
import org.springframework.stereotype.Component;

@Component
public class LotConverter {

    public Lot LotDTOToLot(LotDTO lotDTO) {
        Lot lot = new Lot();

        lot.setId(lotDTO.getId());
        lot.setName(lotDTO.getName());
        lot.setDescription(lotDTO.getDescription());
        lot.setUser_id(lotDTO.getUser_id());

        return lot;
    }

    public LotDTO LotToLotDTO(Lot lot) {
        LotDTO lotDTO = new LotDTO();

        lotDTO.setId(lot.getId());
        lotDTO.setDescription(lot.getDescription());
        lotDTO.setName(lot.getName());
        lotDTO.setUser_id(lot.getUser_id());

        return lotDTO;
    }
}