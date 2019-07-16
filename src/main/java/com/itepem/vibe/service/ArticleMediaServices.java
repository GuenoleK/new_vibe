package com.itepem.vibe.service;

import com.google.cloud.storage.*;
import com.itepem.vibe.domain.*;
import com.itepem.vibe.repository.*;
import com.itepem.vibe.security.SecurityUtils;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Service class for Article Medias.
 */
@Service
@Transactional
public class ArticleMediaServices {

    @Autowired
    ApplicationContext context;

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
     *
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

                if (isDevMode()) {
                    String pathStorage = System.getenv("VIBE_LOCAL_STORAGE_PATH");
                    String filePath = pathStorage + "\\" + extendedUser.getCurrentStructure().getName() + "\\" + article.getTitle();
                    File file = new File(filePath, articleMediaFile.getOriginalFilename());

                    // Create the file using the touch method of the FileUtils class.
                    // FileUtils.touch(file);

                    // Write bytes from the multipart file to disk.
                    FileUtils.writeByteArrayToFile(file, articleMediaFile.getBytes());
                } else {
                    // We create the associated folder
                    // If you don't specify credentials when constructing the client, the client library will
                    // look for credentials via the environment variable GOOGLE_APPLICATION_CREDENTIALS.
                    Storage storage = StorageOptions.getDefaultInstance().getService();

                    BlobId blobId = BlobId.of("epe-m-vibe", extendedUser.getCurrentStructure().getName() + "/" + article.getTitle() + "/" + articleMediaFile.getOriginalFilename());
                    BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(articleMediaFile.getContentType()).build();
                    Blob blob = storage.create(blobInfo, articleMediaFile.getBytes());
                }
            }
        }

        return articleMedia;
    }

    public String getArticleMediaSrcFile(Long articleMediaId) {
        ArticleMedia articleMedia = articleMediaRepository.getOne(articleMediaId);

        // Instantiate a Google Cloud Storage client
        Storage storage = StorageOptions.getDefaultInstance().getService();
        StorageOptions option = StorageOptions.getDefaultInstance();
        String projectId = option.getProjectId();

        Optional<String> userLogin = SecurityUtils.getCurrentUserLogin();

        if (userLogin.isPresent()) {
            Optional<User> optionalUser = userRepository.findOneByLogin(userLogin.get());
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                ExtendedUser extendedUser = extendedUserRepository.findByUserId(user.getId());

                // in dev we use the local memory*
                // otherwise we use google cloud storage
                if (isDevMode()) {
                    String filePath = "storage/" + extendedUser.getCurrentStructure().getName() + "\\" +  articleMedia.getArticle().getTitle() + "\\" + articleMedia.getName();
                    return filePath;
                } else {
                    Blob blob = storage.get(BlobId.of("epe-m-vibe", extendedUser.getCurrentStructure().getName() + "/" + articleMedia.getArticle().getTitle() + "/" + articleMedia.getName()));
                    return "https://storage.googleapis.com/" + blob.getBucket() + "/" + blob.getName();
                }
            }
        }

        return null;
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
                Storage storage = StorageOptions.getDefaultInstance().getService();

                BlobId blobId = BlobId.of("epe-m-vibe", extendedUser.getCurrentStructure().getName() + "/" + article.getTitle() + "/" + articleMediaName);
                storage.delete(blobId);

                // We create the new one

                BlobId newBlobId = BlobId.of("epe-m-vibe", extendedUser.getCurrentStructure().getName() + "/" + article.getTitle() + "/" + articleMediaFile.getOriginalFilename());
                BlobInfo blobInfo = BlobInfo.newBuilder(newBlobId).setContentType(articleMediaFile.getContentType()).build();
                Blob blob = storage.create(blobInfo, articleMediaFile.getBytes());
            }
        }

        return articleMedia;
    }

    private Boolean isDevMode() {
        Boolean isDevMode = false;

        for(String profile: context.getEnvironment().getActiveProfiles()) {
            if(profile.equals("dev")) {
                isDevMode = true;
            }
        }
        return isDevMode;
    }
}
