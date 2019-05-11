package com.itepem.vibe.repository;

import com.itepem.vibe.domain.UserRoleStructure;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the UserRoleStructure entity.
 */
@Repository
public interface UserRoleStructureRepository extends JpaRepository<UserRoleStructure, Long> {

    @Query(value = "select distinct userRoleStructure from UserRoleStructure userRoleStructure left join fetch userRoleStructure.users left join fetch userRoleStructure.roles left join fetch userRoleStructure.structures",
        countQuery = "select count(distinct userRoleStructure) from UserRoleStructure userRoleStructure")
    Page<UserRoleStructure> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct userRoleStructure from UserRoleStructure userRoleStructure left join fetch userRoleStructure.users left join fetch userRoleStructure.roles left join fetch userRoleStructure.structures")
    List<UserRoleStructure> findAllWithEagerRelationships();

    @Query("select userRoleStructure from UserRoleStructure userRoleStructure left join fetch userRoleStructure.users left join fetch userRoleStructure.roles left join fetch userRoleStructure.structures where userRoleStructure.id =:id")
    Optional<UserRoleStructure> findOneWithEagerRelationships(@Param("id") Long id);

}
