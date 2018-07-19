package com.nationwide.totalrecall.services;

import org.apache.http.HttpResponse;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.HttpClients;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class NhtsaVehicleRecalls {
	public void getAndInsertVehicleRecalls(String year, String make, String model) throws IOException {
		StringBuilder sb = new StringBuilder("https://one.nhtsa.gov/webapi/api/Recalls/vehicle/modelyear/");
		sb.append(year);
		sb.append("/make/");
		sb.append(make);
		sb.append("/model/");
		sb.append(model);
		sb.append("?format=json");
		String retJson = workWithApis(sb.toString());
//		TODO: Parse JSON and put in table.
	}

	private String workWithApis(String url) throws IOException {
		HttpGet formPost = new HttpGet(url);
		HttpResponse response = HttpClients.createDefault().execute(formPost);
		if(response.getStatusLine().getStatusCode() != 200) {
			throw new IOException("Request did not work!");
		}

		ResponseHandler<String> handler = new BasicResponseHandler();
		return handler.handleResponse(response);
	}
}
