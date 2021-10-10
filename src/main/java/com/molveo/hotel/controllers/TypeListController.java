package com.molveo.hotel.controllers;

import com.molveo.hotel.models.TypeList;
import com.molveo.hotel.repositories.TypeListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/typeList/")
public class TypeListController {

    @Autowired
    TypeListRepository typeListRepository;

    @GetMapping
    public Iterable<TypeList> getAllTypesList(){
        return typeListRepository.findAll();
    }

    @PostMapping
    public TypeList saveTypesList(@RequestBody TypeList typeList){
        return typeListRepository.save(typeList);
    }

    @PutMapping
    public TypeList updateTypesList(@RequestBody TypeList typeList){
        return typeListRepository.save(typeList);
    }

    @DeleteMapping
    public boolean deleteTypesList(@RequestBody TypeList typeList){
        typeListRepository.delete(typeList);
        return true;
    }
}
