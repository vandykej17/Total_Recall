package com.nationwide.totalrecall.controller;

import com.nationwide.totalrecall.domain.VehicleRecalls;
import com.nationwide.totalrecall.services.VehicleRecallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RecallsController {

	@Autowired
	VehicleRecallService vehicleRecallService;

	@RequestMapping(method = RequestMethod.GET, value = "/getRecalls/{policyNumber}")
	public List<VehicleRecalls> getRecallsByPolicyNumber(@PathVariable(name = "policyNumber") String policyNumber) {
		return vehicleRecallService.getRecallsByPolicyNumber(policyNumber);
	}
}
