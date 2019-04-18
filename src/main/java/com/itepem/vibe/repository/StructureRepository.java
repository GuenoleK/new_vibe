package com.itepem.vibe.repository;

import com.itepem.vibe.domain.Structure;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Structure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StructureRepository extends JpaRepository<Structure, Long> {

    @Query("select structure from Structure structure where structure.owner.login = ?#{principal.username}")
    List<Structure> findByOwnerIsCurrentUser();

    @Query(value = "select distinct structure from Structure structure left join fetch structure.users",
        countQuery = "select count(distinct structure) from Structure structure")
    Page<Structure> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct structure from Structure structure left join fetch structure.users")
    List<Structure> findAllWithEagerRelationships();

    @Query("select structure from Structure structure left join fetch structure.users where structure.id =:id")
    Optional<Structure> findOneWithEagerRelationships(@Param("id") Long id);

}
