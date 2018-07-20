package com.nationwide.totalrecall.domain;

import javax.persistence.*;

@Entity
@Table(name = "User_Child_Safety_Seat")
public class UserChildSafetySeat {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Users user;
	private  ChildSafetySeat childSafetySeat;

	@ManyToOne
	@JoinColumn(name = "User_Id")
	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	@ManyToOne
	@JoinColumn(name = "Child_Safety_Seat_Id")
	public ChildSafetySeat getChildSafetySeat() {
		return childSafetySeat;
	}

	public void setChildSafetySeat(ChildSafetySeat childSafetySeat) {
		this.childSafetySeat = childSafetySeat;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public UserChildSafetySeat() {
	}
}
