package com.itepem.vibe.web.rest;

import com.itepem.vibe.domain.ArticleMediaType;
import com.itepem.vibe.repository.ArticleMediaTypeRepository;
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
 * REST controller for managing {@link com.itepem.vibe.domain.ArticleMediaType}.
 */
@RestController
@RequestMapping("/api")
public class ArticleMediaTypeResource {

    private final Logger log = LoggerFactory.getLogger(ArticleMediaTypeResource.class);

    private static final String ENTITY_NAME = "articleMediaType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArticleMediaTypeRepository articleMediaTypeRepository;

    public ArticleMediaTypeResource(ArticleMediaTypeRepository articleMediaTypeRepository) {
        this.articleMediaTypeRepository = articleMediaTypeRepository;
    }

    /**
     * {@code POST  /article-media-types} : Create a new articleMediaType.
     *
     * @param articleMediaType the articleMediaType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new articleMediaType, or with status {@code 400 (Bad Request)} if the articleMediaType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/article-media-types")
    public ResponseEntity<ArticleMediaType> createArticleMediaType(@Valid @RequestBody ArticleMediaType articleMediaType) throws URISyntaxException {
        log.debug("REST request to save ArticleMediaType : {}", articleMediaType);
        if (articleMediaType.getId() != null) {
            throw new BadRequestAlertException("A new articleMediaType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ArticleMediaType result = articleMediaTypeRepository.save(articleMediaType);
        return ResponseEntity.created(new URI("/api/article-media-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /article-media-types} : Updates an existing articleMediaType.
     *
     * @param articleMediaType the articleMediaType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated articleMediaType,
     * or with status {@code 400 (Bad Request)} if the articleMediaType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the articleMediaType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/article-media-types")
    public ResponseEntity<ArticleMediaType> updateArticleMediaType(@Valid @RequestBody ArticleMediaType articleMediaType) throws URISyntaxException {
        log.debug("REST request to update ArticleMediaType : {}", articleMediaType);
        if (articleMediaType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ArticleMediaType result = articleMediaTypeRepository.save(articleMediaType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, articleMediaType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /article-media-types} : get all the articleMediaTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of articleMediaTypes in body.
     */
    @GetMapping("/article-media-types")
    public List<ArticleMediaType> getAllArticleMediaTypes() {
        log.debug("REST request to get all ArticleMediaTypes");
        return articleMediaTypeRepository.findAll();
    }

    /**
     * {@code GET  /article-media-types/:id} : get the "id" articleMediaType.
     *
     * @param id the id of the articleMediaType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the articleMediaType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/article-media-types/{id}")
    public ResponseEntity<ArticleMediaType> getArticleMediaType(@PathVariable Long id) {
        log.debug("REST request to get ArticleMediaType : {}", id);
        Optional<ArticleMediaType> articleMediaType = articleMediaTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(articleMediaType);
    }

    /**
     * {@code DELETE  /article-media-types/:id} : delete the "id" articleMediaType.
     *
     * @param id the id of the articleMediaType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/article-media-types/{id}")
    public ResponseEntity<Void> deleteArticleMediaType(@PathVariable Long id) {
        log.debug("REST request to delete ArticleMediaType : {}", id);
        articleMediaTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
