//package com.nationwide.totalrecall.domain;
//
//import javax.persistence.*;
//
//@Entity
//@Table(name = "User_Child_Safety_Seat")
//public class UserChildSafetySeatRecall {
//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
//	private Integer id;
//	private UserChildSafetySeat userChildSafetySeat;
//	private Recall recall;
//	private Status status;
//
//	@ManyToOne
//	@JoinColumn(name = "User_Child_Safety_Seat")
//	public UserChildSafetySeat getUserChildSafetySeat() {
//		return userChildSafetySeat;
//	}
//
//	public void setUserChildSafetySeat(UserChildSafetySeat userChildSafetySeat) {
//		this.userChildSafetySeat = userChildSafetySeat;
//	}
//
//	@ManyToOne
//	@JoinColumn(name = "Recall_Id")
//	public Recall getRecall() {
//		return recall;
//	}
//
//	public void setRecall(Recall recall) {
//		this.recall = recall;
//	}
//
//	@ManyToOne
//	@JoinColumn(name = "Status_Id")
//	public Status getStatus() {
//		return status;
//	}
//
//	public void setStatus(Status status) {
//		this.status = status;
//	}
//
//	public Integer getId() {
//		return id;
//	}
//
//	public void setId(Integer id) {
//		this.id = id;
//	}
//
//	public UserChildSafetySeatRecall() {
//	}
//}
