package com.nationwide.totalrecall.controller;

import com.nationwide.totalrecall.services.UsersService;
import com.nationwide.totalrecall.services.VehicleRecallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController extends BaseController {
	@Autowired
	UsersService userService;

	@Autowired
	VehicleRecallService vehicleRecallService;

	@GetMapping("/")
	public String summary() {
		return "summary";
	}

	@GetMapping("/vehicles")
	public String vehicles() {
		return "vehicles";
	}

	@GetMapping("/inquiry")
	public String inquiry() {
		return "inquiry";
	}

	@GetMapping("/email")
	public String email() {
		return "email";
	}

	@GetMapping("/child")
	public String child() {
		return "child";
	}
}
