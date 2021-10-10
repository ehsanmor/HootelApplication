package com.molveo.hotel.models;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private int id;

    private int roomNo; // InventoryId
    private String type;
    private String facilities;
    private int capacity;
    private double price;
    private boolean underConstruction;
    private LocalDate lastBigCleaningDate;
    private int numberOfDaysAfterBigClean;
    private boolean roomNeedsCleaning;

    public Room() {
    }

    public Room(int id, int roomNo, String type, String facilities, int capacity, double price, boolean underConstruction, LocalDate lastBigCleaningDate, int numberOfDaysAfterBigClean, boolean roomNeedsCleaning) {
        this.id = id;
        this.roomNo = roomNo;
        this.type = type;
        this.facilities = facilities;
        this.capacity = capacity;
        this.price = price;
        this.underConstruction = underConstruction;
        this.lastBigCleaningDate = lastBigCleaningDate;
        this.numberOfDaysAfterBigClean = numberOfDaysAfterBigClean;
        this.roomNeedsCleaning = roomNeedsCleaning;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRoomNo() {
        return roomNo;
    }

    public void setRoomNo(int roomNo) {
        this.roomNo = roomNo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFacilities() {
        return facilities;
    }

    public void setFacilities(String facilities) {
        this.facilities = facilities;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isUnderConstruction() {
        return underConstruction;
    }

    public void setUnderConstruction(boolean underConstruction) {
        this.underConstruction = underConstruction;
    }

    public LocalDate getLastBigCleaningDate() {
        return lastBigCleaningDate;
    }

    public void setLastBigCleaningDate(LocalDate lastBigCleaningDate) {
        this.lastBigCleaningDate = lastBigCleaningDate;
    }

    public int getNumberOfDaysAfterBigClean() {
        return numberOfDaysAfterBigClean;
    }

    public void setNumberOfDaysAfterBigClean(int numberOfDaysAfterBigClean) {
        this.numberOfDaysAfterBigClean = numberOfDaysAfterBigClean;
    }

    public boolean isRoomNeedsCleaning() {
        return roomNeedsCleaning;
    }

    public void setRoomNeedsCleaning(boolean roomNeedsCleaning) {
        this.roomNeedsCleaning = roomNeedsCleaning;
    }
}
