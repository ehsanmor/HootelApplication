package com.molveo.hotel.repositories;

import com.molveo.hotel.models.Room;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

@Repository
public interface RoomRepository extends CrudRepository<Room, Integer> {

}
