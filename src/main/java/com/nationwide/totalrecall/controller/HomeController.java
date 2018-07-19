package com.nationwide.totalrecall.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController extends BaseController {
	@GetMapping("/")
	public String summary() {
		return "summary";
	}

	@GetMapping("/vehicles")
	public String vehicles() {
		return "vehicles";
	}
}
