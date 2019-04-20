package com.itepem.vibe.repository;

import com.itepem.vibe.domain.UserRoleStructure;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserRoleStructure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserRoleStructureRepository extends JpaRepository<UserRoleStructure, Long> {

}
