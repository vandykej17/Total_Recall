package com.nationwide.totalrecall.repository;

import com.nationwide.totalrecall.domain.UserVehicleRecall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IUserVehicleRecallRepository extends JpaRepository<UserVehicleRecall, Long> {

	@Modifying
	@Query("UPDATE UserVehicleRecall SET statusId = ?2 WHERE id = ?1")
	void updateUserVehicleRecallById(Integer id, Integer statusId);
}
