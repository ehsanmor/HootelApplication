package com.molveo.hotel.services;

import com.molveo.hotel.exception.ApplicationException;
import com.molveo.hotel.models.Reservation;
import com.molveo.hotel.models.Room;
import com.molveo.hotel.repositories.EmployeeRepository;
import com.molveo.hotel.repositories.GuestRepository;
import com.molveo.hotel.repositories.ReservationRepository;
import com.molveo.hotel.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {
    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    GuestRepository guestRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    public void UpdateReservation(Reservation reservation) throws ApplicationException {
        if(guestRepository.existsById(reservation.getGuest().getId()))
            reservation.setGuest(guestRepository.findById(reservation.getGuest().getId()).get());
        else
            throw new ApplicationException("Guest not found!");

        if(employeeRepository.existsById(reservation.getEmployee().getId()))
            reservation.setEmployee(employeeRepository.findById(reservation.getEmployee().getId()).get());
        else
            throw new ApplicationException("Employee not found!");

        List<Room> rooms = new ArrayList<>();

        for (Room room: reservation.getReservedRooms())
        {
            rooms.add(roomRepository.findById(room.getId()).get());
        }

        reservation.setReservedRooms(rooms);
        reservationRepository.save(reservation);
    }

    public List<Reservation> getReservationsBetweenDates(String fromDate, String toDate) {
        System.out.println("fromDate = " + fromDate + ", toDate = " + toDate);
        Iterable<Reservation> reservations = reservationRepository.findAll();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate date1 = LocalDate.parse(fromDate, formatter);
        LocalDate date2 = LocalDate.parse(toDate, formatter);

        List<Reservation> filteredReservations = new ArrayList<>();

        for (Reservation reservation : reservations) {
            if(reservation.getStartDate().compareTo(date2) <= 0 && reservation.getStartDate().compareTo(date1) >= 0) {
                filteredReservations.add(reservation);
            }
        }

        return filteredReservations;
    }
}
