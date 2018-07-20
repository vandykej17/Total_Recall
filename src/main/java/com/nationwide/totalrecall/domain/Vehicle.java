package com.nationwide.totalrecall.domain;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Vehicle")
public class Vehicle {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(nullable = false)
	private String make;
	@Column(nullable = false)
	private String model;
	@Column(nullable = false)
	private String year;

	@OneToMany(mappedBy = "vehicle")
	private List<Recall> recalls;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getMake() {
		return make;
	}

	public void setMake(String make) {
		this.make = make;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public List<Recall> getRecalls() {
		return recalls;
	}

	public void setRecalls(List<Recall> recalls) {
		this.recalls = recalls;
	}
}
