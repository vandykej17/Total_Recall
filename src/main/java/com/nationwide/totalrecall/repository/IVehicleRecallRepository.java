package com.nationwide.totalrecall.repository;

import com.nationwide.totalrecall.domain.VehicleRecalls;
import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IVehicleRecallRepository extends Repository<VehicleRecalls, Long> {
	VehicleRecalls findAllByPolicyNumber(String policyNumber);
}
