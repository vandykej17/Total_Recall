package com.nationwide.totalrecall.repository;

import com.nationwide.totalrecall.domain.Vehicle;
import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface IVehicleRepository extends Repository<Vehicle, Long> {
	List<Vehicle> findAll();
	Vehicle findAllById(Integer id);
}

