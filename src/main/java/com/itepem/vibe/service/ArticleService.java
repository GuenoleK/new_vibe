package com.itepem.vibe.service;

import com.itepem.vibe.domain.Article;
import com.itepem.vibe.repository.ArticleRepository;
import com.itepem.vibe.web.rest.util.HeaderUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.time.LocalDate;
import java.util.*;

/**
 * Service class for Articles.
 */
@Service
@Transactional
public class ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    /**
     * We load an article list for a given structure
     * @param structureId
     * @return
     */
    public List<Article> getArticleListByStructureId(final Long structureId) {
        return articleRepository.findByStructureId(structureId);
    }

    public Article createArticle(final Article article) {
        Article newArticle = new Article();
        newArticle = article;
        newArticle.setCreationDate(LocalDate.now());
        newArticle.setEditionDate(LocalDate.now());
        newArticle = articleRepository.save(newArticle);
        return newArticle;
    }
}
