package com.itepem.vibe.web.rest;
import com.itepem.vibe.domain.ArticleMedia;
import com.itepem.vibe.repository.ArticleMediaRepository;
import com.itepem.vibe.service.ArticleMediaServices;
import com.itepem.vibe.web.rest.errors.BadRequestAlertException;
import com.itepem.vibe.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ArticleMedia.
 */
@RestController
@RequestMapping("/api")
public class ArticleMediaResource {

    private final Logger log = LoggerFactory.getLogger(ArticleMediaResource.class);

    private static final String ENTITY_NAME = "articleMedia";

    private final ArticleMediaRepository articleMediaRepository;

    private final ArticleMediaServices articleMediaServices;

    public ArticleMediaResource(ArticleMediaRepository articleMediaRepository, ArticleMediaServices articleMediaServices) {
        this.articleMediaRepository = articleMediaRepository;
        this.articleMediaServices = articleMediaServices;
    }

    /**
     * POST  /article-medias : Create a new articleMedia.
     *
     * @param articleMedia the articleMedia to create
     * @return the ResponseEntity with status 201 (Created) and with body the new articleMedia, or with status 400 (Bad Request) if the articleMedia has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/article-medias")
    public ResponseEntity<ArticleMedia> createArticleMedia(@Valid @RequestBody ArticleMedia articleMedia) throws URISyntaxException {
        log.debug("REST request to save ArticleMedia : {}", articleMedia);
        if (articleMedia.getId() != null) {
            throw new BadRequestAlertException("A new articleMedia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ArticleMedia result = articleMediaRepository.save(articleMedia);
        return ResponseEntity.created(new URI("/api/article-medias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    
    @RequestMapping(method = RequestMethod.POST, path = "/article-media/{articleId}")
    public ArticleMedia saveArticleMedia(@RequestParam("articleMediaFile") MultipartFile articleMediaFile, @PathVariable Long articleId) throws IOException {
        return articleMediaServices.saveArticleMedia(articleMediaFile, articleId);
    }

    /**
     * PUT  /article-medias : Updates an existing articleMedia.
     *
     * @param articleMedia the articleMedia to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated articleMedia,
     * or with status 400 (Bad Request) if the articleMedia is not valid,
     * or with status 500 (Internal Server Error) if the articleMedia couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/article-medias")
    public ResponseEntity<ArticleMedia> updateArticleMedia(@Valid @RequestBody ArticleMedia articleMedia) throws URISyntaxException {
        log.debug("REST request to update ArticleMedia : {}", articleMedia);
        if (articleMedia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ArticleMedia result = articleMediaRepository.save(articleMedia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, articleMedia.getId().toString()))
            .body(result);
    }

    /**
     * GET  /article-medias : get all the articleMedias.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of articleMedias in body
     */
    @GetMapping("/article-medias")
    public List<ArticleMedia> getAllArticleMedias() {
        log.debug("REST request to get all ArticleMedias");
        return articleMediaRepository.findAll();
    }

    @GetMapping("/article-media/article/{articleId}")
    public List<ArticleMedia> getArticleMediaListByArticleId(@PathVariable Long articleId) {
        return articleMediaServices.getArticleMediaListByArticleId(articleId);
    }

    /**
     * GET  /article-medias/:id : get the "id" articleMedia.
     *
     * @param id the id of the articleMedia to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the articleMedia, or with status 404 (Not Found)
     */
    @GetMapping("/article-medias/{id}")
    public ResponseEntity<ArticleMedia> getArticleMedia(@PathVariable Long id) {
        log.debug("REST request to get ArticleMedia : {}", id);
        Optional<ArticleMedia> articleMedia = articleMediaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(articleMedia);
    }

    /**
     * DELETE  /article-medias/:id : delete the "id" articleMedia.
     *
     * @param id the id of the articleMedia to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/article-medias/{id}")
    public ResponseEntity<Void> deleteArticleMedia(@PathVariable Long id) {
        log.debug("REST request to delete ArticleMedia : {}", id);
        articleMediaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
