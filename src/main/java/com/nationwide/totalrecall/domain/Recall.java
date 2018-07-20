package com.nationwide.totalrecall.domain;

import javax.persistence.*;

@Entity
@Table(name = "Recall")
public class Recall {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private String reason;

	@ManyToOne
	@JoinColumn(name = "vehicle_id", nullable = false)
	private Vehicle vehicle;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public Vehicle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}

	public Recall() {
	}
}
