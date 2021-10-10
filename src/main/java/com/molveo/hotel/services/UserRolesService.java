package com.molveo.hotel.services;

import com.molveo.hotel.models.UserRoles;
import com.molveo.hotel.repositories.UserRolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRolesService {
    @Autowired
    UserRolesRepository userRolesRepository;

    public Iterable<UserRoles> getAllRoles() {
        return this.userRolesRepository.findAll();
    }

    public UserRoles addRole(UserRoles userRoles){
        return (UserRoles) this.userRolesRepository.save(userRoles);
    }

    public UserRoles changeRole(UserRoles userRoles){
        return (UserRoles) this.userRolesRepository.save(userRoles);
    }

    public void deleteRole(UserRoles userRoles) {
        this.userRolesRepository.delete(userRoles);
    }

    public Iterable<UserRoles> getRolesForUser(String roleName) {
        return this.userRolesRepository.findByRoleName(roleName);
    }
}
