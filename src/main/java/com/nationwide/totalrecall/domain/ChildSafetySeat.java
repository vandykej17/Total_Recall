package com.nationwide.totalrecall.domain;

import javax.persistence.*;

@Entity
@Table(name = "Child_Safety_Seat")
public class ChildSafetySeat {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(nullable = false)
	private String brand;

	@Column(nullable = false)
	private String model;

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getReason() {
		return brand;
	}

	public void setReason(String reason) {
		this.brand = reason;
	}

	public ChildSafetySeat() {
	}
}
