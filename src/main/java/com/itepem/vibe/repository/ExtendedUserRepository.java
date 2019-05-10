package com.itepem.vibe.repository;

import com.itepem.vibe.domain.ExtendedUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ExtendedUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedUserRepository extends JpaRepository<ExtendedUser, Long> {

    @Query("select extendedUser from ExtendedUser extendedUser where extendedUser.user.id = ?1")
    ExtendedUser findByUserId(final Long userId);
}
