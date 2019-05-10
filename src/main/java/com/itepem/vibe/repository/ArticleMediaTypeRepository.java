package com.itepem.vibe.repository;

import com.itepem.vibe.domain.Article;
import com.itepem.vibe.domain.ArticleMediaType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the ArticleMediaType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleMediaTypeRepository extends JpaRepository<ArticleMediaType, Long> {

    @Query("select articleMediaType from ArticleMediaType articleMediaType where articleMediaType.code = ?1")
    ArticleMediaType findByCode(final String code);

}
