package com.molveo.hotel.repositories;

import com.molveo.hotel.models.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Integer> {
    Boolean existsByEmail(String email);

    Optional<Employee> findByEmail(String email);
}
