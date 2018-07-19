package com.nationwide.totalrecall.controller;

import com.nationwide.totalrecall.services.RecallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class UpdateRecallsController extends BaseController {
	@Autowired
	private RecallService recallService;

	@GetMapping("/update")
	public String index() throws IOException {
		recallService.getAllVehiclesAndUpdateRecallsInDB();
		return "Success!";
	}

}
