package com.itepem.vibe.service;

import com.itepem.vibe.domain.Article;
import com.itepem.vibe.domain.ExtendedUser;
import com.itepem.vibe.domain.User;
import com.itepem.vibe.repository.ArticleRepository;
import com.itepem.vibe.repository.ExtendedUserRepository;
import com.itepem.vibe.repository.UserRepository;
import com.itepem.vibe.security.SecurityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Service class for Articles.
 */
@Service
@Transactional
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final ExtendedUserRepository extendedUserRepository;

    public ArticleService(ArticleRepository articleRepository, UserRepository userRepository, ExtendedUserRepository extendedUserRepository) {

        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.extendedUserRepository = extendedUserRepository;
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
        newArticle.setContent("");
        newArticle = articleRepository.save(newArticle);
        Optional<String> userLogin = SecurityUtils.getCurrentUserLogin();

        if (userLogin.isPresent()) {
            Optional<User> optionalUser = userRepository.findOneByLogin(userLogin.get());
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                ExtendedUser extendedUser = extendedUserRepository.findByUserId(user.getId());

                newArticle.setUser(extendedUser.getUser());
                newArticle.setStructure(extendedUser.getCurrentStructure());
            }
        }

        return newArticle;
    }
}
