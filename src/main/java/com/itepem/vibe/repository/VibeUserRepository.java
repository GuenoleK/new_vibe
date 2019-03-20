package com.itepem.vibe.repository;

import com.itepem.vibe.domain.VibeUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the VibeUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VibeUserRepository extends JpaRepository<VibeUser, Long> {

}
