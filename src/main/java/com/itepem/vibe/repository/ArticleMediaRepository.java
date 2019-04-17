package com.itepem.vibe.repository;

import com.itepem.vibe.domain.ArticleMedia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ArticleMedia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleMediaRepository extends JpaRepository<ArticleMedia, Long> {

    @Query("select article_media from ArticleMedia article_media where article_media.user.login = ?#{principal.username}")
    List<ArticleMedia> findByUserIsCurrentUser();

}
