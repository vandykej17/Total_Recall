package com.nationwide.totalrecall.services;

import com.nationwide.totalrecall.domain.Vehicle;
import com.nationwide.totalrecall.dto.VehicleRecallResponseDTO;
import com.nationwide.totalrecall.repository.IVehicleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class RecallService {
	private final static Logger LOGGER = LoggerFactory.getLogger(RecallService.class);
	private IVehicleRepository vehicleRepository;
	@Autowired
	NhtsaVehicleRecalls nhtsaVehicleRecalls;

	@Autowired
	public void setIUserRepository(IVehicleRepository vehicleRepository){
		this.vehicleRepository = vehicleRepository;
	}

	public void getAllVehiclesAndUpdateRecallsInDB() {
//		TODO: Get all vehicles from the DB and loop
		List<Vehicle> vehicleList = vehicleRepository.findAll();
		try{
			List<VehicleRecallResponseDTO> listOfObjects = new ArrayList<>();
//			TODO: Call this with actual DB vehicle info
			for (Vehicle vehicle: vehicleList){
				listOfObjects.add(nhtsaVehicleRecalls.getAndInsertVehicleRecalls(vehicle.getYear(), vehicle.getMake(), vehicle.getModel()));
			}
			System.out.println(listOfObjects.size());
//			TODO: get user_vehicles_id and insert with recall_id into user_vehicle_recall table
		} catch(IOException e) {
			LOGGER.error("Error with calling vehicle: ", e);
		}


	}


}
