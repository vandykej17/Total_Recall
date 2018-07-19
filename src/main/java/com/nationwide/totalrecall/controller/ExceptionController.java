package com.nationwide.totalrecall.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.nationwide.totalrecall.exceptions.UserSessionException;
import com.nationwide.totalrecall.model.SessionExpiredModel;

@ControllerAdvice
@Controller
public class ExceptionController extends BaseController implements ErrorController {

	private final static Logger LOGGER = LoggerFactory.getLogger(ExceptionController.class);

	@ExceptionHandler(value = UserSessionException.class)
	public @ResponseBody SessionExpiredModel handleSessionExpired(HttpServletRequest request) {
		SessionExpiredModel sessionExpiredModel = new SessionExpiredModel();
		sessionExpiredModel.setRedirect("/");
		return sessionExpiredModel;
	}

	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(NoHandlerFoundException.class)
	public String handle404Error(NoHandlerFoundException ex, HttpServletRequest request) {
		LOGGER.error("Request: " + request.getRequestURL(), ex);
		return "forward:/error";
	}

	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(Exception.class)
	public String handleError(Exception ex, HttpServletRequest request) {
		LOGGER.error("Request: " + request.getRequestURL(), ex);
		return "forward:/error";
	}

//	This is necessary so ajax calls can redirect to /error and render a view.
//	This also allows both exception handlers from up above to forward to the same view.
	@RequestMapping("/error")
	public String errorPage() {
		return "errorPage";
	}

	@Override
	public String getErrorPath() {
		return "/error";
	}
}
