package com.nationwide.totalrecall.domain;

import javax.persistence.*;

@Entity
@Table(name = "User_Vehicle_Recall")
public class UserVehicleRecall {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	private Integer userVehicleId;

	@ManyToOne
	@JoinColumn(name = "status_id")
	private Status status;

	private Integer recallId;

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserVehicleId() {
		return userVehicleId;
	}

	public void setUserVehicleId(Integer userVehicleId) {
		this.userVehicleId = userVehicleId;
	}

	public Integer getRecallId() {
		return recallId;
	}

	public void setRecallId(Integer recallId) {
		this.recallId = recallId;
	}
}
