package com.molveo.hotel.repositories;

import com.molveo.hotel.models.Reservation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface ReservationRepository extends CrudRepository<Reservation, Integer> {
}
