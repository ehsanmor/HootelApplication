package com.molveo.hotel.repositories;

import com.molveo.hotel.models.Guest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GuestRepository extends CrudRepository<Guest, Integer> {

    boolean existsByEmail(String email);
}
