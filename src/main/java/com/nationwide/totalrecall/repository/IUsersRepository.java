package com.nationwide.totalrecall.repository;

import com.nationwide.totalrecall.domain.Users;
import org.springframework.data.domain.*;
import org.springframework.data.repository.*;

import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IUsersRepository extends Repository<Users, Long>  {
	Page<Users> findAll(Pageable pageable);
	Users findAllById(Integer id);
}
