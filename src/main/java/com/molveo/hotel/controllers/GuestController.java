package com.molveo.hotel.controllers;

import com.molveo.hotel.exception.ApplicationException;
import com.molveo.hotel.exception.NotFoundException;
import com.molveo.hotel.models.Guest;
import com.molveo.hotel.repositories.GuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("api/guest/")
public class GuestController {

    @Autowired
    private GuestRepository guestRepository;

    @GetMapping
    public Iterable<Guest> getAllGuests(){
        return this.guestRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Guest> saveGuest(@RequestBody Guest guest) throws ApplicationException {
        if(!this.guestRepository.existsByEmail(guest.getEmail())){
            this.guestRepository.save(guest);
        }else{
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "A guest with the same email already exists.");
        }
        return ResponseEntity.ok(guest);
    }

    @PutMapping
    public ResponseEntity<Guest> updateGuest(@RequestBody Guest guest){
        if(!this.guestRepository.existsByEmail(guest.getEmail())){
            this.guestRepository.save(guest);
        }else{
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "A guest with the same email already exists.");
        }
        return ResponseEntity.ok(guest);
    }

    @DeleteMapping
    public boolean deleteGuest(@RequestBody Guest guest) throws ApplicationException {
        try {
            this.guestRepository.delete(guest);
        } catch (Exception e){
            throw new ApplicationException("Guest can not be deleted, related data exists!");
        }
        return true;
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Optional<Guest> getGuestById(@PathVariable int id) {
        Optional<Guest> guest = this.guestRepository.findById(id);
        if(guest == null)
            throw new NotFoundException();

        return guest;
    }
}
