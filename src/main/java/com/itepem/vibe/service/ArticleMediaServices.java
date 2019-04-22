package com.itepem.vibe.service;

import com.itepem.vibe.domain.Article;
import com.itepem.vibe.domain.ArticleMedia;
import com.itepem.vibe.repository.ArticleMediaRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Service class for Article Medias.
 */
@Service
@Transactional
public class ArticleMediaServices {

    private final ArticleMediaRepository articleMediaRepository;

    public ArticleMediaServices(ArticleMediaRepository articleMediaRepository) {
        this.articleMediaRepository = articleMediaRepository;
    }

    /**
     * We load an article media list for a given article
     * @param articleId
     * @return
     */
    public List<ArticleMedia> getArticleMediaListByArticleId(final Long articleId) {
        return articleMediaRepository.getArticleMediaListByArticleId(articleId);
    }
}
