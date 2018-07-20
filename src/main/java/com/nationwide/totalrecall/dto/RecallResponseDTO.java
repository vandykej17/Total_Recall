package com.nationwide.totalrecall.dto;

public class RecallResponseDTO {
	String Manufacturer;
	String NHTSACampaignNumber;
	String ReportReceivedDate;
	String Component;
	String Summary;
	String Conequence;
	String Remedy;
	String Notes;
	String ModelYear;
	String Make;
	String Model;

	public String getManufacturer() {
		return Manufacturer;
	}

	public void setManufacturer(String manufacturer) {
		Manufacturer = manufacturer;
	}

	public String getNHTSACampaignNumber() {
		return NHTSACampaignNumber;
	}

	public void setNHTSACampaignNumber(String NHTSACampaignNumber) {
		this.NHTSACampaignNumber = NHTSACampaignNumber;
	}

	public String getReportReceivedDate() {
		return ReportReceivedDate;
	}

	public void setReportReceivedDate(String reportReceivedDate) {
		ReportReceivedDate = reportReceivedDate;
	}

	public String getComponent() {
		return Component;
	}

	public void setComponent(String component) {
		Component = component;
	}

	public String getSummary() {
		return Summary;
	}

	public void setSummary(String summary) {
		Summary = summary;
	}

	public String getConequence() {
		return Conequence;
	}

	public void setConequence(String conequence) {
		Conequence = conequence;
	}

	public String getRemedy() {
		return Remedy;
	}

	public void setRemedy(String remedy) {
		Remedy = remedy;
	}

	public String getNotes() {
		return Notes;
	}

	public void setNotes(String notes) {
		Notes = notes;
	}

	public String getModelYear() {
		return ModelYear;
	}

	public void setModelYear(String modelYear) {
		ModelYear = modelYear;
	}

	public String getMake() {
		return Make;
	}

	public void setMake(String make) {
		Make = make;
	}

	public String getModel() {
		return Model;
	}

	public void setModel(String model) {
		Model = model;
	}
}
