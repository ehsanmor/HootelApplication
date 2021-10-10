package com.molveo.hotel.controllers;

import com.molveo.hotel.exception.ApplicationException;
import com.molveo.hotel.models.Reservation;
import com.molveo.hotel.repositories.ReservationRepository;
import com.molveo.hotel.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("api/reservation/")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ReservationService reservationService;

    @GetMapping
    public Iterable<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @PostMapping
    public Reservation saveReservation(@RequestBody Reservation reservation) throws ApplicationException {
        try{
            reservationService.UpdateReservation(reservation);
        }catch (ApplicationException e)
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
        return reservationRepository.save(reservation);
    }

    @PutMapping
    public Reservation updateReservation(@RequestBody Reservation reservation) throws ApplicationException {
        try{
            reservationService.UpdateReservation(reservation);
        }catch (ApplicationException e)
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
        return reservationRepository.save(reservation);
    }

    @DeleteMapping
    public boolean deleteReservation(@RequestBody Reservation reservation){
        reservationRepository.delete(reservation);
        return true;
    }

    @GetMapping(value = "report/{fromDate}/{toDate}", produces = "application/json")
    public ResponseEntity<List<Reservation>> getReport(@PathVariable(name = "fromDate", required = true) String fromDate, @PathVariable(name = "toDate", required = true) String toDate) {

        List<Reservation> reservations = reservationService.getReservationsBetweenDates(fromDate, toDate);

        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }
}

