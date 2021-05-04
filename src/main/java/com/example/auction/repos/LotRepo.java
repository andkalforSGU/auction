package com.example.auction.repos;

import com.example.auction.entities.Lot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LotRepo extends JpaRepository<Lot, Integer> {
    Lot findUserByName(String name);
}
