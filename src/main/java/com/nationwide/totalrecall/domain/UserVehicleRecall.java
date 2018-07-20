package com.nationwide.totalrecall.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "user_vehicle_recall")
public class UserVehicleRecall {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "user_vehicle_id")
	private Integer userVehicleId;

	@Column(name = "recall_id")
	private Integer recallId;

	@Column(name = "status_id")
	private Integer statusId;
}
