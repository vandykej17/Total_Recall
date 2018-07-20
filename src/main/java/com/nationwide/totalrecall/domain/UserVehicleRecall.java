package com.nationwide.totalrecall.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "user_vehicle_recall")
public class UserVehicleRecall {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(name = "user_vehicle_id")
	private Integer userVehicleId;

	@Column(name = "recall_id")
	private Integer recallId;

	//@ManyToOne
	@JoinColumn(name = "status_id")
	private Integer statusId;
}
