package com.itepem.vibe.repository;

import com.itepem.vibe.domain.ArticleMedia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ArticleMedia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleMediaRepository extends JpaRepository<ArticleMedia, Long> {

}
