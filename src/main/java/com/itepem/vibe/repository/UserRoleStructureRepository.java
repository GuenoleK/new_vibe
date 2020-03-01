package com.itepem.vibe.repository;

import com.itepem.vibe.domain.ArticleMedia;
import com.itepem.vibe.domain.UserRoleStructure;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the UserRoleStructure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserRoleStructureRepository extends JpaRepository<UserRoleStructure, Long> {

    @Query( "" + //
        "select " + //
        "   user_role_structure " + //
        "from " + //
        "   UserRoleStructure user_role_structure " + //
        "where " + //
        "   user_role_structure.user.id = ?1")
    List<UserRoleStructure> getUserRoleStructureListByUserId(final Long userId);

}
