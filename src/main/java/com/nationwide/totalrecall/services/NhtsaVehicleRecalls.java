package com.nationwide.totalrecall.services;

import com.google.gson.Gson;
import com.nationwide.totalrecall.domain.Recall;
import com.nationwide.totalrecall.domain.Vehicle;
import com.nationwide.totalrecall.dto.RecallResponseDTO;
import com.nationwide.totalrecall.dto.VehicleRecallResponseDTO;
import com.nationwide.totalrecall.repository.IRecallRepository;
import org.apache.http.HttpResponse;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class NhtsaVehicleRecalls {
	private IRecallRepository recallRepository;

	@Autowired
	public void setIUserRepository(IRecallRepository iRecallRepository){
		this.recallRepository = iRecallRepository;
	}

	public void getAndInsertVehicleRecalls(Vehicle vehicle) throws IOException {
		StringBuilder sb = new StringBuilder("https://one.nhtsa.gov/webapi/api/Recalls/vehicle/modelyear/");
		sb.append(vehicle.getYear());
		sb.append("/make/");
		sb.append(vehicle.getMake());
		sb.append("/model/");
		//sb.append(URLEncoder.encode(model, "UTF-8"));
		sb.append(vehicle.getModel().replace(" ", "%20"));
		sb.append("?format=json");
		Gson gson = new Gson();

		String retJson = workWithApis(sb.toString());
		System.out.println(retJson);
		VehicleRecallResponseDTO response = gson.fromJson(retJson, VehicleRecallResponseDTO.class);
		for (RecallResponseDTO recallResponseDTO : response.getResults()){
			saveRecall(vehicle, recallResponseDTO);
		}
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

	private void saveRecall(Vehicle vehicle, RecallResponseDTO recallResponseDTO){
		Recall recall = new Recall();
		recall.setReason(recallResponseDTO.getSummary());
		recall.setVehicle(vehicle);
		recallRepository.save(recall);
	}
}
