package com.nationwide.totalrecall.controller;

import com.nationwide.totalrecall.service.RecallService;
import com.nationwide.totalrecall.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class HomeController extends BaseController {
	@Autowired
	UsersService userService;

	@Autowired
	RecallService recallService;


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

	@GetMapping("/getRecall/{policyNumber}")
	public ModelAndView getRecallsByPolicyNumber(@PathVariable(name = "policyNumber") String policyNumber) {
		ModelAndView mav = new ModelAndView();
		mav.addObject("Users", recallService.getRecallsByPolicyNumber(policyNumber));
		mav.setViewName("recalls");
		return mav;
	}
}
