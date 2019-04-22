package com.itepem.vibe.web.rest;
import com.itepem.vibe.domain.ArticleMediaType;
import com.itepem.vibe.repository.ArticleMediaTypeRepository;
import com.itepem.vibe.web.rest.errors.BadRequestAlertException;
import com.itepem.vibe.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ArticleMediaType.
 */
@RestController
@RequestMapping("/api")
public class ArticleMediaTypeResource {

    private final Logger log = LoggerFactory.getLogger(ArticleMediaTypeResource.class);

    private static final String ENTITY_NAME = "articleMediaType";

    private final ArticleMediaTypeRepository articleMediaTypeRepository;

    public ArticleMediaTypeResource(ArticleMediaTypeRepository articleMediaTypeRepository) {
        this.articleMediaTypeRepository = articleMediaTypeRepository;
    }

    /**
     * POST  /article-media-types : Create a new articleMediaType.
     *
     * @param articleMediaType the articleMediaType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new articleMediaType, or with status 400 (Bad Request) if the articleMediaType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/article-media-types")
    public ResponseEntity<ArticleMediaType> createArticleMediaType(@Valid @RequestBody ArticleMediaType articleMediaType) throws URISyntaxException {
        log.debug("REST request to save ArticleMediaType : {}", articleMediaType);
        if (articleMediaType.getId() != null) {
            throw new BadRequestAlertException("A new articleMediaType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ArticleMediaType result = articleMediaTypeRepository.save(articleMediaType);
        return ResponseEntity.created(new URI("/api/article-media-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /article-media-types : Updates an existing articleMediaType.
     *
     * @param articleMediaType the articleMediaType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated articleMediaType,
     * or with status 400 (Bad Request) if the articleMediaType is not valid,
     * or with status 500 (Internal Server Error) if the articleMediaType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/article-media-types")
    public ResponseEntity<ArticleMediaType> updateArticleMediaType(@Valid @RequestBody ArticleMediaType articleMediaType) throws URISyntaxException {
        log.debug("REST request to update ArticleMediaType : {}", articleMediaType);
        if (articleMediaType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ArticleMediaType result = articleMediaTypeRepository.save(articleMediaType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, articleMediaType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /article-media-types : get all the articleMediaTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of articleMediaTypes in body
     */
    @GetMapping("/article-media-types")
    public List<ArticleMediaType> getAllArticleMediaTypes() {
        log.debug("REST request to get all ArticleMediaTypes");
        return articleMediaTypeRepository.findAll();
    }

    /**
     * GET  /article-media-types/:id : get the "id" articleMediaType.
     *
     * @param id the id of the articleMediaType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the articleMediaType, or with status 404 (Not Found)
     */
    @GetMapping("/article-media-types/{id}")
    public ResponseEntity<ArticleMediaType> getArticleMediaType(@PathVariable Long id) {
        log.debug("REST request to get ArticleMediaType : {}", id);
        Optional<ArticleMediaType> articleMediaType = articleMediaTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(articleMediaType);
    }

    /**
     * DELETE  /article-media-types/:id : delete the "id" articleMediaType.
     *
     * @param id the id of the articleMediaType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/article-media-types/{id}")
    public ResponseEntity<Void> deleteArticleMediaType(@PathVariable Long id) {
        log.debug("REST request to delete ArticleMediaType : {}", id);
        articleMediaTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
