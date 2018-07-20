package com.nationwide.totalrecall.services;

import com.nationwide.totalrecall.domain.VehicleRecalls;
import com.nationwide.totalrecall.repository.IUserVehicleRecallRepository;
import com.nationwide.totalrecall.repository.IVehicleRecallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleRecallService {

	private IVehicleRecallRepository vehicleRecallRepository;
	private IUserVehicleRecallRepository userVehicleRecallRepository;

	@Autowired
	public void setVehicleRecallRepository(IVehicleRecallRepository vehicleRecallRepository) {
		this.vehicleRecallRepository = vehicleRecallRepository;
	}

	@Autowired
	public void setUserVehicleRecallRepository(IUserVehicleRecallRepository userVehicleRecallRepository) {
		this.userVehicleRecallRepository = userVehicleRecallRepository;
	}

	public List<VehicleRecalls> getRecallsByPolicyNumber(String policyNumber) {
		return vehicleRecallRepository.findAllByPolicyNumberAndMessage(policyNumber, "Unknown");
	}

	public void updateUserVehicleRecallById(Integer vehicleRecallId, Integer statusId) {
		userVehicleRecallRepository.updateUserVehicleRecallById(vehicleRecallId, statusId);
	}
}
