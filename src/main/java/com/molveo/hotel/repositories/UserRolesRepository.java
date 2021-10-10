package com.molveo.hotel.repositories;

import com.molveo.hotel.models.UserRoles;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRolesRepository extends CrudRepository<UserRoles, Integer> {
    Iterable<UserRoles> findByRoleName(String roleName);
}
