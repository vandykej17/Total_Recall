package com.nationwide.totalrecall.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class RecallService {
	private final static Logger LOGGER = LoggerFactory.getLogger(RecallService.class);

	@Autowired
	NhtsaVehicleRecalls nhtsaVehicleRecalls;

	public void getAllVehiclesAndUpdateRecallsInDB() {
//		TODO: Get all vehicles from the DB and loop
		try{
//			TODO: Call this with actual DB vehicle info
			nhtsaVehicleRecalls.getAndInsertVehicleRecalls("2000", "saturn", "LS");
//			TODO: get user_vehicles_id and insert with recall_id into user_vehicle_recall table
		} catch(IOException e) {
			LOGGER.error("Error with calling vehicle: ", e);
		}


	}


}
