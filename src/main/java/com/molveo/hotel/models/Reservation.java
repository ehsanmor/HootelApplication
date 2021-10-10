package com.molveo.hotel.models;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private int id;

    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private LocalDate paymentDate;
    private boolean resChecked;
    private double price;
    private double additionalPrice;
    private String paymentType;
    private boolean resEnded;
    private int noOfPeople;
    @ManyToMany
    List<Room> reservedRooms;

    @ManyToOne
    private Guest guest;

    @JoinColumn(name = "employeeId", nullable = false)
    @ManyToOne
    private Employee employee;

    public Reservation() {
    }

    public Reservation(int id, LocalDate startDate, LocalDate endDate, LocalDate checkIn, LocalDate checkOut, LocalDate paymentDate, boolean resChecked, double price, double additionalPrice, String paymentType, boolean resEnded,int noOfPeople,List<Room> reservedRooms, Guest guest, Employee employee) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.paymentDate = paymentDate;
        this.resChecked = resChecked;
        this.price = price;
        this.additionalPrice = additionalPrice;
        this.paymentType = paymentType;
        this.resEnded = resEnded;
        this.noOfPeople = noOfPeople;
        this.reservedRooms = reservedRooms;
        this.guest = guest;
        this.employee = employee;
    }

    public Reservation(int id, LocalDate now, LocalDate endDate, LocalDate now1, LocalDate checkOut, LocalDate now2, boolean resChecked, int price, int additionalPrice, String cash, boolean resEnded, List<Optional<Room>> reservedRooms1, Guest guest1, Employee employeeTest1) {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalDate checkIn) {
        this.checkIn = checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(LocalDate checkOut) {
        this.checkOut = checkOut;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public boolean isResChecked() {
        return resChecked;
    }

    public void setResChecked(boolean resChecked) {
        this.resChecked = resChecked;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getAdditionalPrice() {
        return additionalPrice;
    }

    public void setAdditionalPrice(double additionalPrice) {
        this.additionalPrice = additionalPrice;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public boolean isResEnded() {
        return resEnded;
    }

    public void setResEnded(boolean resEnded) {
        this.resEnded = resEnded;
    }

    public int getNoOfPeople() {
        return noOfPeople;
    }

    public void setNoOfPeople(int noOfPeople) {
        this.noOfPeople = noOfPeople;
    }

    public List<Room> getReservedRooms() {
        return reservedRooms;
    }

    public void setReservedRooms(List<Room> reservedRooms) {
        this.reservedRooms = reservedRooms;
    }

    public Guest getGuest() {
        return guest;
    }

    public void setGuest(Guest guest) {
        this.guest = guest;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
