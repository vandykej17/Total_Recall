package com.nationwide.totalrecall.services;

import com.nationwide.totalrecall.domain.Recall;
import com.nationwide.totalrecall.domain.UserVehicle;
import com.nationwide.totalrecall.domain.UserVehicleRecall;
import com.nationwide.totalrecall.domain.Vehicle;
import com.nationwide.totalrecall.dto.VehicleRecallResponseDTO;
import com.nationwide.totalrecall.repository.IUserVehicleRecallRepository;
import com.nationwide.totalrecall.repository.IUserVehicleRepository;
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
	@Autowired
	NhtsaVehicleRecalls nhtsaVehicleRecalls;

	@Autowired
	IVehicleRepository vehicleRepository;

	@Autowired
	IUserVehicleRepository userVehicleRepository;

	@Autowired
	IUserVehicleRecallRepository userVehicleRecallRepository;
	public void getAllVehiclesAndUpdateRecallsInDB() {
		List<Vehicle> vehicleList = vehicleRepository.findAll();
		try{

			List<VehicleRecallResponseDTO> listOfObjects = new ArrayList<>();
			for (Vehicle vehicle: vehicleList){
				nhtsaVehicleRecalls.getAndInsertVehicleRecalls(vehicle);

				for (Recall recall: vehicle.getRecalls()){
					List<UserVehicle> userVehicleList = userVehicleRepository.findAllByVehicleId(vehicle.getId());
					for (UserVehicle userVehicle : userVehicleList){
						UserVehicleRecall userVehicleRecall = new UserVehicleRecall();
						userVehicleRecall.setRecallId(recall.getId());
						userVehicleRecall.setUserVehicleId(userVehicle.getId());
						userVehicleRecall.setStatusId(1);
						userVehicleRecallRepository.save(userVehicleRecall);
					}
				}

			}
			System.out.println(listOfObjects.size());
//			TODO: get user_vehicles_id and insert with recall_id into user_vehicle_recall table
		} catch(IOException e) {
			LOGGER.error("Error with calling vehicle: ", e);
		}


	}


}
