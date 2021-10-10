package com.molveo.hotel.controllers;

import com.molveo.hotel.models.UserRoles;
import com.molveo.hotel.services.UserRolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/userroles/")
public class UserRolesController {
    @Autowired
    UserRolesService userRolesService;

    @GetMapping
    public Iterable<UserRoles> getAll(){
        return this.userRolesService.getAllRoles();
    }

    @GetMapping("{roleName}")
    public Iterable<UserRoles> getRolesForUser(@PathVariable String roleName){
        return this.userRolesService.getRolesForUser(roleName);
    }

    @PostMapping
    public UserRoles addRole(@RequestBody UserRoles userRoles){
        return this.userRolesService.addRole(userRoles);
    }

    @PutMapping
    public UserRoles changeRole(@RequestBody UserRoles userRoles){
        return this.userRolesService.changeRole(userRoles);
    }

    @DeleteMapping
    public void deleteRole(@RequestBody UserRoles userRoles){
        this.userRolesService.deleteRole(userRoles);
    }
}
