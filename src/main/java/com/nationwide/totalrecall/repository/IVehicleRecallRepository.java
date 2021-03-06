package com.nationwide.totalrecall.repository;

import com.nationwide.totalrecall.domain.VehicleRecalls;
import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface IVehicleRecallRepository extends Repository<VehicleRecalls, Long> {
	List<VehicleRecalls> findAllByPolicyNumberInAndMessage(List policyNumber, String message);
}
