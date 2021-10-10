package com.molveo.hotel.repositories;

import com.molveo.hotel.models.TypeList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeListRepository extends CrudRepository<TypeList, Integer> {

}
