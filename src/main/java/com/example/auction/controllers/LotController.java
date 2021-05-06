package com.example.auction.controllers;

import com.example.auction.DTO.LotDTO;
import com.example.auction.services.LotService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.ValidationException;
import java.util.List;

@Log
@RestController
@AllArgsConstructor
@RequestMapping("/lots")
public class LotController {
    private final LotService lotService;

    @PostMapping("/save")
    public LotDTO saveLot(@RequestBody LotDTO lotDTO) throws ValidationException {
        log.info("Save lot: " + lotDTO.getName());
        lotService.saveLot(lotDTO);

        return lotDTO;
    }

    @GetMapping("/findAll")
    public List<LotDTO> findAll() {
        log.info("Find all");
        return lotService.findAll();
    }

    @GetMapping("/findAllByUserId/{id}")
    public List<LotDTO> findAllByUserId(@PathVariable Integer id) {
        log.info("Find all lots by user id: " + id);
        return lotService.findAllByUserId(id);
    }

    @DeleteMapping("delete/{id}")
    public void deleteById(@PathVariable Integer id) {
        log.info("Delete lot: " + id);
        lotService.deleteLot(id);
    }
}
