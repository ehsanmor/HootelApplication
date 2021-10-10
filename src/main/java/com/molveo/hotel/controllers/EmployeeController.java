package com.molveo.hotel.controllers;

import com.molveo.hotel.exception.ApplicationException;
import com.molveo.hotel.exception.NotFoundException;
import com.molveo.hotel.models.Employee;
import com.molveo.hotel.models.Employee;
import com.molveo.hotel.repositories.EmployeeRepository;
import com.molveo.hotel.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("api/employee/")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public Iterable<Employee> getAllEmployees() {
        return employeeService.findAll();
    }

    @PostMapping
    public Employee saveEmployee(@RequestBody Employee employee) {
        return employeeService.save(employee);
    }

    @PutMapping
    public Employee updateEmployee(@RequestBody Employee employee){
        return employeeService.save(employee);
    }

    @DeleteMapping
    public boolean deleteEmployee(@RequestBody Employee employee){
        employeeService.delete(employee);
        return true;
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Optional<Employee> getEmployeeById(@PathVariable int id) {
        Optional<Employee> employee = this.employeeService.findById(id);
        if(employee == null)
            throw new NotFoundException();

        return employee;
    }

    @RequestMapping(value = "signin/", method = RequestMethod.POST)
    public ResponseEntity<Optional<Employee>> getEmployeeByEmail(@RequestBody Employee user) throws ApplicationException {
        Optional<Employee> employee;

//        if(email == "" || email == null)
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Please enter a valid email!");
//
//        if(password == "" || password == null)
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Please enter a valid password!");

        try{
            employee = this.employeeService.findUser(user);
        }catch (ApplicationException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
        return ResponseEntity.ok(employee);
    }
}
