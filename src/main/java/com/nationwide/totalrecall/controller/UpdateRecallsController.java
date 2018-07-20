package com.nationwide.totalrecall.controller;

import com.nationwide.totalrecall.services.RecallService;
import com.nationwide.totalrecall.services.VehicleRecallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
public class UpdateRecallsController extends BaseController {
	@Autowired
	private RecallService recallService;

	@Autowired
	VehicleRecallService vehicleRecallService;

	@GetMapping("/update")
	public String index() throws IOException {
		recallService.getAllVehiclesAndUpdateRecallsInDB();
		return "Success!";
	}

	@RequestMapping(method = RequestMethod.GET, value = "/updateUserVehicleRecallById/{vehicleRecallId}/{statusId}")
	public void updateUserVehicleRecallById(@PathVariable(name = "vehicleRecallId") Integer vehicleRecallId, @PathVariable(name = "statusId") Integer statusId) {
		vehicleRecallService.updateUserVehicleRecallById(vehicleRecallId, statusId);
	}

}
