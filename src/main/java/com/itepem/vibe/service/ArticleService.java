package com.itepem.vibe.service;

import com.itepem.vibe.config.Constants;
import com.itepem.vibe.domain.Article;
import com.itepem.vibe.domain.Authority;
import com.itepem.vibe.domain.User;
import com.itepem.vibe.repository.ArticleRepository;
import com.itepem.vibe.repository.AuthorityRepository;
import com.itepem.vibe.repository.UserRepository;
import com.itepem.vibe.security.AuthoritiesConstants;
import com.itepem.vibe.security.SecurityUtils;
import com.itepem.vibe.service.dto.UserDTO;
import com.itepem.vibe.service.util.RandomUtil;
import com.itepem.vibe.web.rest.errors.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service class for managing users.
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
