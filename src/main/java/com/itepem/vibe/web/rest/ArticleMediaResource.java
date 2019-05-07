package com.itepem.vibe.web.rest;

import com.itepem.vibe.domain.ArticleMedia;
import com.itepem.vibe.repository.ArticleMediaRepository;
import com.itepem.vibe.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.itepem.vibe.domain.ArticleMedia}.
 */
@RestController
@RequestMapping("/api")
public class ArticleMediaResource {

    private final Logger log = LoggerFactory.getLogger(ArticleMediaResource.class);

    private static final String ENTITY_NAME = "articleMedia";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArticleMediaRepository articleMediaRepository;

    public ArticleMediaResource(ArticleMediaRepository articleMediaRepository) {
        this.articleMediaRepository = articleMediaRepository;
    }

    /**
     * {@code POST  /article-medias} : Create a new articleMedia.
     *
     * @param articleMedia the articleMedia to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new articleMedia, or with status {@code 400 (Bad Request)} if the articleMedia has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/article-medias")
    public ResponseEntity<ArticleMedia> createArticleMedia(@Valid @RequestBody ArticleMedia articleMedia) throws URISyntaxException {
        log.debug("REST request to save ArticleMedia : {}", articleMedia);
        if (articleMedia.getId() != null) {
            throw new BadRequestAlertException("A new articleMedia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ArticleMedia result = articleMediaRepository.save(articleMedia);
        return ResponseEntity.created(new URI("/api/article-medias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /article-medias} : Updates an existing articleMedia.
     *
     * @param articleMedia the articleMedia to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated articleMedia,
     * or with status {@code 400 (Bad Request)} if the articleMedia is not valid,
     * or with status {@code 500 (Internal Server Error)} if the articleMedia couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/article-medias")
    public ResponseEntity<ArticleMedia> updateArticleMedia(@Valid @RequestBody ArticleMedia articleMedia) throws URISyntaxException {
        log.debug("REST request to update ArticleMedia : {}", articleMedia);
        if (articleMedia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ArticleMedia result = articleMediaRepository.save(articleMedia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, articleMedia.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /article-medias} : get all the articleMedias.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of articleMedias in body.
     */
    @GetMapping("/article-medias")
    public List<ArticleMedia> getAllArticleMedias() {
        log.debug("REST request to get all ArticleMedias");
        return articleMediaRepository.findAll();
    }

    /**
     * {@code GET  /article-medias/:id} : get the "id" articleMedia.
     *
     * @param id the id of the articleMedia to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the articleMedia, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/article-medias/{id}")
    public ResponseEntity<ArticleMedia> getArticleMedia(@PathVariable Long id) {
        log.debug("REST request to get ArticleMedia : {}", id);
        Optional<ArticleMedia> articleMedia = articleMediaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(articleMedia);
    }

    /**
     * {@code DELETE  /article-medias/:id} : delete the "id" articleMedia.
     *
     * @param id the id of the articleMedia to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/article-medias/{id}")
    public ResponseEntity<Void> deleteArticleMedia(@PathVariable Long id) {
        log.debug("REST request to delete ArticleMedia : {}", id);
        articleMediaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
