package com.molveo.hotel;

import com.molveo.hotel.models.*;
import com.molveo.hotel.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@SpringBootApplication
public class HotelApplication implements CommandLineRunner {

  RoomRepository roomRepository;
  GuestRepository guestRepository;
  TypeListRepository typeListRepository;
  ReservationRepository reservationRepository;
  EmployeeRepository employeeRepository;
  UserRolesRepository userRolesRepository;

  public static void main(String[] args) {
    SpringApplication.run(HotelApplication.class, args);
  }

  @Autowired
  public HotelApplication(
          RoomRepository roomRepository,
          GuestRepository guestRepository,
          TypeListRepository typeListRepository,
          ReservationRepository reservationRepository,
          EmployeeRepository employeeRepository,
          UserRolesRepository userRolesRepository
  ) {
    this.roomRepository = roomRepository;
    this.guestRepository = guestRepository;
    this.typeListRepository = typeListRepository;
    this.reservationRepository = reservationRepository;
    this.employeeRepository = employeeRepository;
    this.userRolesRepository = userRolesRepository;
  }

  @Override
  public void run(String... args) throws Exception {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
    LocalDate date = LocalDate.parse("27-06-2021", formatter);

    List<Room> reservedRooms = new ArrayList<>();
    List<Room> reservedRooms1 = new ArrayList<>();
    List<Room> reservedRooms2 = new ArrayList<>();

    roomRepository.save(new Room(0,101,"Normal","TV | mountain view",2,45,false, date,7,false));
    roomRepository.save(new Room(0,102,"Economy","TV | lake view",1,25,false, date,7,false));
    roomRepository.save(new Room(0,103,"Economy","TV | mountain view",2,45,false, date,7,false));
    roomRepository.save(new Room(0,104,"Luxurious","TV | lake view | Sauna",3,45,false, date,7,false));
    roomRepository.save(new Room(0,105,"Normal","TV | mountain view",2,45,false, date,7,false));
    roomRepository.save(new Room(0,507,"Economy","TV | lake view",1,25,false, date,7,false));
    roomRepository.save(new Room(0,600,"Economy","TV | mountain view",2,45,false, date,7,false));
    roomRepository.save(new Room(0,460,"Luxurious","TV | lake view | Sauna",3,45,false, date,7,false));
    roomRepository.save(new Room(0,505,"Luxurious","TV | lake view | Sauna",3,45,false, date,7,false));

    Optional<Room> optionalRoom =  roomRepository.findById(1);
    Room room = optionalRoom.get();
    reservedRooms.add(room);

    Optional<Room> optionalRoom1 =  roomRepository.findById(2);
    Room room1 = optionalRoom1.get();
    reservedRooms1.add(room1);

    Optional<Room> optionalRoom2 =  roomRepository.findById(3);
    Room room2 = optionalRoom2.get();
    reservedRooms2.add(room2);

    Optional<Room> optionalRoom3 =  roomRepository.findById(4);
    Room room3 = optionalRoom3.get();
    reservedRooms2.add(room3);

    typeListRepository.save(new TypeList(0, "Room", "Economy"));
    typeListRepository.save(new TypeList(0, "Room", "Normal"));
    typeListRepository.save(new TypeList(0, "Room", "Luxurious"));

    typeListRepository.save(new TypeList(0, "Guest", "VIP"));
    typeListRepository.save(new TypeList(0, "Guest", "Business"));
    typeListRepository.save(new TypeList(0, "Guest", "Loyal"));
    typeListRepository.save(new TypeList(0, "Guest", "Normal"));

    typeListRepository.save(new TypeList(0, "Facility", "TV"));
    typeListRepository.save(new TypeList(0, "Facility", "Mountain View"));
    typeListRepository.save(new TypeList(0, "Facility", "Lake View"));
    typeListRepository.save(new TypeList(0, "Facility", "Sauna"));
    typeListRepository.save(new TypeList(0, "Facility", "Mini Bar"));

    typeListRepository.save(new TypeList(0, "Employee", "Manager"));
    typeListRepository.save(new TypeList(0, "Employee", "Admin"));
    typeListRepository.save(new TypeList(0, "Employee", "Receptionist"));
    typeListRepository.save(new TypeList(0, "Employee", "Cleaner"));

    Guest guestTest = new Guest(
            0,
            "Veli",
            "Ataseven",
            "veliataseven@mail.com",
            "password1",
            "0612345678",
            "Normal",
            1
    );
    guestRepository.save(guestTest);
    Guest guest1 = new Guest(
            0,
            "Yonas",
            "Berhe Woldemichael",
            "yonasberhe@gmail.com",
            "password2",
            "0622345678",
            "Normal",
            1
    );
    guestRepository.save(guest1);
    guestRepository.save(
            new Guest(
                    0,
                    "Esra",
                    "Tepebasi",
                    "esratepebasi@outlook.com",
                    "password3",
                    "0632345678",
                    "Loyal",
                    4
            )
    );
    guestRepository.save(
            new Guest(
                    0,
                    "Ehsan",
                    "Moradi",
                    "ehsanmoradi@gmail.com",
                    "password4",
                    "0642345678",
                    "VIP",
                    7
            )
    );
    guestRepository.save(
            new Guest(
                    0,
                    "Onder",
                    "Icyer",
                    "ondericyer@mail.com",
                    "password5",
                    "0652345678",
                    "Business",
                    3
            )
    );

//    List<Employee> employees = new ArrayList<>();
    Employee employeeTest = new Employee(0, "John", "Jansen", "johnjansen@gmail.com", "1", "0612312312", "Admin");
    employeeRepository.save(employeeTest);
    Employee employeeTest1 = new Employee(0, "Maria", "Brode", "mariabrode@gmail.com", "2", "0622312312", "Manager");
    employeeRepository.save(employeeTest1);
    employeeRepository.save(new Employee(0, "Anca", "Morris", "ancamorris@gmail.com", "3", "0632312312", "Receptionist"));
    employeeRepository.save(new Employee(0, "Astrid", "Marta", "astridmarta@gmail.com", "4", "0642312312", "Cleaner"));
    employeeRepository.save(new Employee(0, "Misti", "Brok", "mistibrok@gmail.com", "5", "0652312312", "Guest"));

    this.reservationRepository.save(new Reservation(0, LocalDate.now().plusDays(2), LocalDate.now().plusDays(7), LocalDate.now(), LocalDate.now().plusDays(7), LocalDate.now(), false, 35, 0, "Cash", false,3 ,reservedRooms1, guest1, employeeTest1));
    this.reservationRepository.save(new Reservation(0, LocalDate.now().plusDays(15), LocalDate.now().plusDays(8), LocalDate.now(), LocalDate.now().plusDays(8), LocalDate.now(), false, 450, 20, "iDeal", false,2,reservedRooms, guestTest, employeeTest1));
    this.reservationRepository.save(new Reservation(0, LocalDate.now().plusDays(8), LocalDate.now().plusDays(9), LocalDate.now(), LocalDate.now().plusDays(9), LocalDate.now(), false, 200, 10, "Credit Card", false, 4,reservedRooms2, guest1, employeeTest));

    this.userRolesRepository.save(new UserRoles(0, "Admin", "Write", "Write", "Write", "Write", "Write", "Write"));
    this.userRolesRepository.save(new UserRoles(0, "Manager", "Write", "Write", "Write", "Write", "Read", "Read"));
    this.userRolesRepository.save(new UserRoles(0, "Receptionist", "Read", "Write", "Read", "None", "Write", "None"));
    this.userRolesRepository.save(new UserRoles(0, "Cleaner", "None", "None", "Read", "None", "Write", "None"));
  }
}
