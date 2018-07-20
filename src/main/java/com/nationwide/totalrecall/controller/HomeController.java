package com.nationwide.totalrecall.controller;

import com.nationwide.totalrecall.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController extends BaseController {
	@Autowired
	UsersService userService;

	@GetMapping("/")
	public ModelAndView index() {
		ModelAndView mav = new ModelAndView();
		mav.addObject("Users", userService.getUser());
		mav.setViewName("home");
		return mav;
	}

	@GetMapping("/summary")
	public String summary() {
		return "summary";
	}

	@GetMapping("/vehicles")
	public String vehicles() {
		return "vehicles";
	}
}
