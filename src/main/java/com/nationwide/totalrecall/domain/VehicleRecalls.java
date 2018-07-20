package com.nationwide.totalrecall.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "vehiclerecalls")
public class VehicleRecalls {
	@Id
	@Column(name = "user_vehicle_recall_id")
	private Integer userVehicleRecallId;

	@Column(name = "Vehicle_ID")
	private Integer vehicleId;

	private String year;
	private String make;
	private String model;
	private String reason;
	private String message;

	@Column(name = "policynumber")
	private String policyNumber;


}
