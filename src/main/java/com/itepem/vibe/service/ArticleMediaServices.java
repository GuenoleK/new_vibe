package com.itepem.vibe.service;

import com.itepem.vibe.domain.*;
import com.itepem.vibe.repository.*;

import com.itepem.vibe.security.SecurityUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

/**
 * Service class for Article Medias.
 */
@Service
@Transactional
public class ArticleMediaServices {

    private final ArticleMediaRepository articleMediaRepository;
    private final ArticleMediaTypeRepository articleMediaTypeRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final ExtendedUserRepository extendedUserRepository;

    public ArticleMediaServices(
        ArticleMediaRepository articleMediaRepository, ArticleRepository articleRepository,
        UserRepository userRepository, ExtendedUserRepository extendedUserRepository,
        ArticleMediaTypeRepository articleMediaTypeRepository) {
        this.articleMediaRepository = articleMediaRepository;
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.extendedUserRepository = extendedUserRepository;
        this.articleMediaTypeRepository = articleMediaTypeRepository;
    }

    /**
     * We load an article media list for a given article
     * @param articleId
     * @return
     */
    public List<ArticleMedia> getArticleMediaListByArticleId(final Long articleId) {
        return articleMediaRepository.getArticleMediaListByArticleId(articleId);
    }

    public ArticleMedia saveArticleMedia(final MultipartFile articleMediaFile, final Long articleId) throws IOException {

        ArticleMedia articleMedia = new ArticleMedia();
        articleMedia.setName(articleMediaFile.getOriginalFilename());
        // We get the article
        Article article = articleRepository.findById(articleId).get();
        articleMedia.setArticle(article);

        // SET MEDIATYPE FROM FILE SPLIT (.) extension
        String[] strings = articleMedia.getName().split("\\.");
        String mediaType = strings[1];

        if (mediaType.equals("pdf")) {
            ArticleMediaType articleMediaType = articleMediaTypeRepository.findByCode("PDF");
            articleMedia.setArticleMediaType(articleMediaType);
        } else {
            ArticleMediaType articleMediaType = articleMediaTypeRepository.findByCode("AUDIO");
            articleMedia.setArticleMediaType(articleMediaType);
        }

        Optional<String> userLogin = SecurityUtils.getCurrentUserLogin();

        if (userLogin.isPresent()) {
            Optional<User> optionalUser = userRepository.findOneByLogin(userLogin.get());
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                ExtendedUser extendedUser = extendedUserRepository.findByUserId(user.getId());
                articleMedia.setUser(user);
                articleMedia = articleMediaRepository.save(articleMedia);
                // We create the associated folder
                File fileToSave = new File("D:\\zz_perso\\vibe-files\\" + extendedUser.getCurrentStructure().getName() + "\\" + article.getTitle() + "\\" + articleMediaFile.getOriginalFilename());
                articleMediaFile.transferTo(fileToSave);
            }
        }

        return articleMedia;
    }

    public ArticleMedia updateArticleMedia(final MultipartFile articleMediaFile, final Long articleMediaId) throws IOException {

        ArticleMedia articleMedia = articleMediaRepository.getOne(articleMediaId);
        final String articleMediaName = articleMedia.getName();
        articleMedia.setName(articleMediaFile.getOriginalFilename());
        // We get the article
        Article article = articleRepository.findById(articleMedia.getArticle().getId()).get();

        Optional<String> userLogin = SecurityUtils.getCurrentUserLogin();

        if (userLogin.isPresent()) {
            Optional<User> optionalUser = userRepository.findOneByLogin(userLogin.get());
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                ExtendedUser extendedUser = extendedUserRepository.findByUserId(user.getId());

                // We update the articleMedia
                articleMedia = articleMediaRepository.save(articleMedia);

                // We delete file previous file
                File fileToDelete = new File("D:\\zz_perso\\vibe-files\\" + extendedUser.getCurrentStructure().getName() + "\\" + article.getTitle() + "\\" + articleMediaName);
                fileToDelete.delete();

                // We create the new one
                File fileToSave = new File("D:\\zz_perso\\vibe-files\\" + extendedUser.getCurrentStructure().getName() + "\\" + article.getTitle() + "\\" + articleMediaFile.getOriginalFilename());
                articleMediaFile.transferTo(fileToSave);
            }
        }

        return articleMedia;
    }
}
