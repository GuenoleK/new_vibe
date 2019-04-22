package com.itepem.vibe.service;

import com.itepem.vibe.domain.Article;
import com.itepem.vibe.repository.ArticleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
