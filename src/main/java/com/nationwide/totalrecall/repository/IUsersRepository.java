package com.nationwide.totalrecall.repository;

import com.nationwide.totalrecall.domain.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface IUsersRepository extends Repository<Users, Long>  {
	Page<Users> findAll(Pageable pageable);
	List<Users> findAll();
	Users findAllById(Integer id);
}
