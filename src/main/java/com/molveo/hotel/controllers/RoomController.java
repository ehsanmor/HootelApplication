package com.molveo.hotel.controllers;

import com.molveo.hotel.models.Room;
import com.molveo.hotel.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/room/")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @GetMapping
    public Iterable<Room> getAllRooms() {
        System.out.println(roomRepository.findAll());
        return roomRepository.findAll();
    }

    @PostMapping
    public Room saveRoom(@RequestBody Room room) {
        return roomRepository.save(room);
    }

    @PutMapping
    public Room updateRoom(@RequestBody Room room){
        return roomRepository.save(room);
    }

    @DeleteMapping
    public boolean deleteRoom(@RequestBody Room room){
        roomRepository.delete(room);
        return true;
    }

//    @GetMapping("{id}")
//    public Room findRoomById(@RequestParam int id){
//        Optional<Room> optionalRoom =  roomRepository.findById(id);
//        Room room = optionalRoom.get();
//        return room;
//    }
}
