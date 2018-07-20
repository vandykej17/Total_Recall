package com.nationwide.totalrecall.services;

import com.nationwide.totalrecall.domain.VehicleRecalls;
import com.nationwide.totalrecall.repository.IVehicleRecallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecallService {

	private IVehicleRecallRepository vehicleRecallRepository;

	@Autowired
	public void setVehicleRecallRepository(IVehicleRecallRepository vehicleRecallRepository) {
		this.vehicleRecallRepository = vehicleRecallRepository;
	}

	public VehicleRecalls getRecallsByPolicyNumber(String policyNumber) {
		return vehicleRecallRepository.findAllByPolicyNumber(policyNumber);
	}
}
