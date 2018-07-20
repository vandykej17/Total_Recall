package com.nationwide.totalrecall.dto;

import java.util.List;


public class VehicleRecallResponseDTO {
	String Count;
	String Message;

	List<RecallResponseDTO> Results;

	public String getCount() {
		return Count;
	}

	public void setCount(String count) {
		Count = count;
	}

	public String getMessage() {
		return Message;
	}

	public void setMessage(String message) {
		Message = message;
	}

	public List<RecallResponseDTO> getResults() {
		return Results;
	}

	public void setResults(List<RecallResponseDTO> results) {
		Results = results;
	}
}
