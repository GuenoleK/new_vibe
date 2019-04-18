package com.itepem.vibe.repository;

import com.itepem.vibe.domain.ArticleMediaType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ArticleMediaType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleMediaTypeRepository extends JpaRepository<ArticleMediaType, Long> {

}
