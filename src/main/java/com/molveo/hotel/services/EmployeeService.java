package com.molveo.hotel.services;

import com.molveo.hotel.exception.ApplicationException;
import com.molveo.hotel.models.Employee;
import com.molveo.hotel.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;


    public Iterable<Employee> findAll() {
        return this.employeeRepository.findAll();
    }

    public Employee save(Employee employee) {
        return this.employeeRepository.save(employee);
    }

    public void delete(Employee employee) {
        this.employeeRepository.delete(employee);
    }

    public Optional<Employee> findById(int id) {
        return this.employeeRepository.findById(id);
    }

    public Optional<Employee> findUser(Employee user) throws ApplicationException {
        String email = user.getEmail();
        String password = user.getPassword();

        if(email == "" || email == null)
            throw new ApplicationException("Please enter a valid email!");

        if(password == "" || password == null)
                    throw new ApplicationException("Please enter a valid password!");
        Optional<Employee> employee;
        if(this.employeeRepository.existsByEmail(email))
             employee = this.employeeRepository.findByEmail(email);
        else
            throw new ApplicationException("No user found with this email!");

        if (!employee.get().getPassword().equals(password)) {
            throw new ApplicationException("Please make sure to enter correct password!");
        }
        return employee;
    }
}
