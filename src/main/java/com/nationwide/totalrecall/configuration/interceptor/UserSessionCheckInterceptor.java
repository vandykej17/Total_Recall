package com.nationwide.totalrecall.configuration.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

@Component
public class UserSessionCheckInterceptor implements HandlerInterceptor {
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		if (isResourceHandler(handler)) {
			return true;
		}
		return true;
	}

	private boolean isResourceHandler(Object handler) {
		return handler instanceof ResourceHttpRequestHandler;
	}
}
