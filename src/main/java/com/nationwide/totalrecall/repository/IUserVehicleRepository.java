package com.nationwide.totalrecall.repository;

import com.nationwide.totalrecall.domain.UserVehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface IUserVehicleRepository extends JpaRepository<UserVehicle, Long> {
	List<UserVehicle> findAll();
	List<UserVehicle> findAllByVehicleId(Integer id);
}
