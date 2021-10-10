package com.molveo.hotel.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UserRoles {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    String roleName;
    String employee;
    String guest;
    String room;
    String typeList;
    String reservation;
    String userRoles;

    public UserRoles() {
    }

    public UserRoles(int id, String roleName, String employee, String guest, String room, String typeList, String reservation, String userRoles) {
        this.id = id;
        this.roleName = roleName;
        this.employee = employee;
        this.guest = guest;
        this.room = room;
        this.typeList = typeList;
        this.reservation = reservation;
        this.userRoles = userRoles;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getEmployee() {
        return employee;
    }

    public void setEmployee(String employee) {
        this.employee = employee;
    }

    public String getGuest() {
        return guest;
    }

    public void setGuest(String guest) {
        this.guest = guest;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getTypeList() {
        return typeList;
    }

    public void setTypeList(String typeList) {
        this.typeList = typeList;
    }

    public String getReservation() {
        return reservation;
    }

    public void setReservation(String reservation) {
        this.reservation = reservation;
    }

    public String getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(String userRoles) {
        this.userRoles = userRoles;
    }
}
