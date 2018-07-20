package com.nationwide.totalrecall.service;

import com.nationwide.totalrecall.domain.Users;
import com.nationwide.totalrecall.repository.IUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

	private IUsersRepository userRepository;

	@Autowired
	public void setIUserRepository(IUsersRepository userRepository){
		this.userRepository = userRepository;
	}
	public Users getUser(){
		return userRepository.findAllById(1);
	}
}
