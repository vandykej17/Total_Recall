package com.nationwide.totalrecall.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.nationwide.totalrecall.model.BaseModel;

public abstract class BaseController {

	@Resource
	MessageSource messageSource;

	protected String getMessage(String code, Object... args) {
		return messageSource.getMessage(code, args, null);
	}

	/*Return the ResponseEntity to redirect to the same view with error if file doesn't exists*/
	protected ResponseEntity redirect(RedirectAttributes redirectAttributes, BaseModel baseModel, HttpServletRequest request) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Location", request.getContextPath() + baseModel.getUrl());
		redirectAttributes.addFlashAttribute(baseModel.getModelName(), baseModel);
		redirectAttributes.addFlashAttribute("fileNotFound", "error.file.notFound");
		return new ResponseEntity(headers, HttpStatus.FOUND);
	}

	protected void setupBaseModel(BaseModel baseModel, String modelName, String url) {
		baseModel.setModelName(modelName);
		baseModel.setUrl(url);
	}

	protected String getMessage(MessageSourceResolvable messageSourceResolvable) {
		return messageSource.getMessage(messageSourceResolvable, null);
	}
}
