package com.nationwide.totalrecall.repository;

import com.nationwide.totalrecall.domain.Recall;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IRecallRepository extends Repository<Recall, Long>  {
	Page<Recall> findAll(Pageable pageable);
	Recall findAllById(Integer id);
}
